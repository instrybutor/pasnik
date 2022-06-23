import { useEffect, useRef, useState } from 'react';
import Tick, { TickElement } from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';
import classNames from 'classnames';

export interface FlipDateProps {
  endAt: string;
  className?: string;
}

export const FlipDate = ({ endAt, className }: FlipDateProps) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const tickRef = useRef<TickElement | null>(null);
  const [tickValue, setTickValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const didInit = (tick: TickElement) => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    const tickValue = tickRef.current;
    Tick.DOM.create(currDiv!, {
      didInit,
    });

    return () => Tick.DOM.destroy(tickValue!);
  }, [endAt]);

  useEffect(() => {
    const counter = Tick.count.down(new Date(endAt), {
      format: ['d', 'h', 'm', 's'],
    });
    counter.onupdate = function (value: any) {
      setTickValue({
        days: value[0],
        hours: value[1],
        minutes: value[2],
        seconds: value[3],
      });
    };

    return () => {
      setTimeout(
        ((counter) => () => {
          counter.timer.stop();
        })(counter)
      );
    };
  }, [endAt]);

  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = tickValue;
    }
  }, [tickValue]);

  return (
    <div
      ref={divRef}
      className={classNames('tick flex items-center', className)}
    >
      <div data-layout="horizontal fit">
        {tickValue.days > 0 && (
          <>
            <span
              data-key="days"
              data-repeat="true"
              data-transform="pad(00) -> split -> delay"
            >
              <span data-view="flip"></span>
            </span>
            <span className="tick-text-inline">:</span>
          </>
        )}

        <span
          data-key="hours"
          data-repeat="true"
          data-transform="pad(00) -> split -> delay"
        >
          <span data-view="flip"></span>
        </span>

        <span className="tick-text-inline">:</span>

        <span
          data-key="minutes"
          data-repeat="true"
          data-transform="pad(00) -> split -> delay"
        >
          <span data-view="flip"></span>
        </span>

        <span className="tick-text-inline">:</span>

        <span
          data-key="seconds"
          data-repeat="true"
          data-transform="pad(00) -> split -> delay"
        >
          <span data-view="flip"></span>
        </span>
      </div>
    </div>
  );
};
