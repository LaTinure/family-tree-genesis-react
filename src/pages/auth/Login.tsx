
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { Layout } from '@/components/layout/Layout';
import { FamilyLoginForm } from '@/components/auth/FamilyLoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <div className="w-full max-w-md">
          <FamilyLoginForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link to={ROUTES.AUTH.REGISTER} className="text-blue-600 hover:underline font-medium">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
