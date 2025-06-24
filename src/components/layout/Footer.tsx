
import { Link } from 'react-router-dom';
import { TreePine, Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <TreePine className="h-8 w-8" />
              <span className="text-2xl font-bold">Famille Connect</span>
            </div>
            <p className="text-green-100 mb-4">
              Créez, préservez et partagez l'histoire de votre famille avec une application moderne et sécurisée.
            </p>
            <div className="flex items-center space-x-2 text-green-100">
              <Heart className="h-4 w-4" />
              <span>Fait avec amour pour les familles</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-green-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/tree" className="text-green-100 hover:text-white transition-colors">
                  Arbre généalogique
                </Link>
              </li>
              <li>
                <Link to="/dashboard/members" className="text-green-100 hover:text-white transition-colors">
                  Membres
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-green-100">
                <Mail className="h-4 w-4" />
                <span>contact@familleconnect.com</span>
              </li>
              <li className="flex items-center space-x-2 text-green-100">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2 text-green-100">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-500 mt-8 pt-8 text-center text-green-100">
          <p>&copy; 2024 Famille Connect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
