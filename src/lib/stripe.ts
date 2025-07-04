import***REMOVED***Stripe***REMOVED***from***REMOVED***'stripe';

//***REMOVED***Configuration***REMOVED***Stripe
export***REMOVED***const***REMOVED***stripe***REMOVED***=***REMOVED***new***REMOVED***Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY!,***REMOVED***{
***REMOVED******REMOVED***apiVersion:***REMOVED***'2023-10-16',
});

//***REMOVED***Types***REMOVED***pour***REMOVED***les***REMOVED***sessions***REMOVED***de***REMOVED***paiement
export***REMOVED***interface***REMOVED***CreateCheckoutSessionParams***REMOVED***{
***REMOVED******REMOVED***successUrl:***REMOVED***string;
***REMOVED******REMOVED***cancelUrl:***REMOVED***string;
***REMOVED******REMOVED***priceId?:***REMOVED***string;
***REMOVED******REMOVED***customAmount?:***REMOVED***number;***REMOVED***//***REMOVED***en***REMOVED***centimes
}

//***REMOVED***Fonction***REMOVED***pour***REMOVED***créer***REMOVED***une***REMOVED***session***REMOVED***de***REMOVED***checkout
export***REMOVED***async***REMOVED***function***REMOVED***createCheckoutSession({
***REMOVED******REMOVED***successUrl,
***REMOVED******REMOVED***cancelUrl,
***REMOVED******REMOVED***priceId,
***REMOVED******REMOVED***customAmount***REMOVED***=***REMOVED***500***REMOVED***//***REMOVED***5€***REMOVED***par***REMOVED***défaut
}:***REMOVED***CreateCheckoutSessionParams)***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***session***REMOVED***=***REMOVED***await***REMOVED***stripe.checkout.sessions.create({
***REMOVED******REMOVED******REMOVED******REMOVED***payment_method_types:***REMOVED***['card'],
***REMOVED******REMOVED******REMOVED******REMOVED***line_items:***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***price_data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***currency:***REMOVED***'eur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***product_data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***name:***REMOVED***'Création***REMOVED***de***REMOVED***Dynastie',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Accès***REMOVED***premium***REMOVED***pour***REMOVED***créer***REMOVED***et***REMOVED***gérer***REMOVED***votre***REMOVED***arbre***REMOVED***généalogique***REMOVED***familial',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***images:***REMOVED***['https://your-domain.com/dynasty-icon.png'],***REMOVED***//***REMOVED***Optionnel
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***unit_amount:***REMOVED***customAmount,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***quantity:***REMOVED***1,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***],
***REMOVED******REMOVED******REMOVED******REMOVED***mode:***REMOVED***'payment',
***REMOVED******REMOVED******REMOVED******REMOVED***success_url:***REMOVED***successUrl,
***REMOVED******REMOVED******REMOVED******REMOVED***cancel_url:***REMOVED***cancelUrl,
***REMOVED******REMOVED******REMOVED******REMOVED***metadata:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***product_type:***REMOVED***'dynasty_creation',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***'current_user_id',***REMOVED***//***REMOVED***À***REMOVED***remplacer***REMOVED***par***REMOVED***l'ID***REMOVED***utilisateur***REMOVED***réel
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***});

***REMOVED******REMOVED***return***REMOVED***session;
}

//***REMOVED***Fonction***REMOVED***pour***REMOVED***récupérer***REMOVED***une***REMOVED***session
export***REMOVED***async***REMOVED***function***REMOVED***retrieveSession(sessionId:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***await***REMOVED***stripe.checkout.sessions.retrieve(sessionId);
}

//***REMOVED***Fonction***REMOVED***pour***REMOVED***lister***REMOVED***les***REMOVED***paiements
export***REMOVED***async***REMOVED***function***REMOVED***listPayments(limit***REMOVED***=***REMOVED***10)***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***await***REMOVED***stripe.paymentIntents.list({
***REMOVED******REMOVED******REMOVED******REMOVED***limit,
***REMOVED******REMOVED***});
}
