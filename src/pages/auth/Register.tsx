
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { Layout } from '@/components/layout/Layout';
import { FamilyRegisterForm } from '@/components/auth/FamilyRegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
        <div className="w-full max-w-2xl">
          <FamilyRegisterForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link to={ROUTES.AUTH.LOGIN} className="text-blue-600 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
