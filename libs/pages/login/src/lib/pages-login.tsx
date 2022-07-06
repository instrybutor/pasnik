import { Suspense } from 'react';
import { LoginSectionSkeleton } from './login-section/login-section-skeleton';
import { LoginSection } from './login-section/login-section';

export function PagesLogin() {
  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col justify-center"
      style={{
        background:
          'url(https://source.unsplash.com/1200x800?food,meal) no-repeat center center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="absolute top-0 right-0 w-screen md:w-1/3 h-screen bg-white shadow-lg"
        style={{ boxShadow: '-2px 1px 10px rgb(0 0 0 / 15%)' }}
      >
        <Suspense fallback={<LoginSectionSkeleton />}>
          <LoginSection />
        </Suspense>
      </div>
    </div>
  );
}

export default PagesLogin;
