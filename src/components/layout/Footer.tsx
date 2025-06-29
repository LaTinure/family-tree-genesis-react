import { Link } from 'react-router-dom';
import { TreePine, Heart, Mail, Phone, MapPin, Star } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-whatsapp-700 to-whatsapp-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <TreePine className="h-6 w-6 text-whatsapp-100" />
                <Star className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-whatsapp-100 bg-clip-text text-transparent">
                Famille Connect
              </span>
            </div>
            <p className="text-whatsapp-100 mb-4">
              Créez, préservez et partagez l'histoire de votre famille.
            </p>
            <div className="flex items-center space-x-2 text-whatsapp-100">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Fait avec amour pour les familles</span>
            </div>
            <p className="text-xs text-whatsapp-200 mt-2">
              Par Thierry Gogo Développeur FullStack
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-whatsapp-100 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-whatsapp-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/tree" className="text-whatsapp-100 hover:text-white transition-colors">
                  Arbre généalogique
                </Link>
              </li>
              <li>
                <Link to="/dashboard/members" className="text-whatsapp-100 hover:text-white transition-colors">
                  Membres
                </Link>
              </li>
              <li>
                <Link to="/auth-family" className="text-whatsapp-100 hover:text-white transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-whatsapp-100">
                <Mail className="h-4 w-4" />
                <span>contact@familleconnect.com</span>
              </li>
              <li className="flex items-center space-x-2 text-whatsapp-100">
                <Phone className="h-4 w-4" />
                <span>+225 07 58 96 61 56</span>
              </li>
              <li className="flex items-center space-x-2 text-whatsapp-100">
                <MapPin className="h-4 w-4" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-whatsapp-600 mt-8 pt-8 text-center text-whatsapp-100">
          <p>&copy; 2024 Famille Connect. Tous droits réservés.</p>
          <p className="text-xs mt-1">Unis par le sang, connectés par la technologie</p>
        </div>
      </div>
    </footer>
  );
};
