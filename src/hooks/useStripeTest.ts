
import { useState } from 'react';

export interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  logs: string[];
}

export const useStripeTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const testApi = async (testData?: {
    customAmount?: number;
    tempUserData?: {
      email: string;
      phone: string;
    };
  }) => {
    setIsLoading(true);
    const logs: string[] = [];
    
    try {
      logs.push('🚀 Début du test API');
      
      const requestData = {
        customAmount: testData?.customAmount || 1000,
        successUrl: `${window.location.origin}/dynasty/create`,
        cancelUrl: `${window.location.origin}/dynasty/payment`,
        tempUserData: testData?.tempUserData || {
          email: "test@example.com",
          phone: "+33712345678"
        }
      };

      logs.push(`📤 Données envoyées: ${JSON.stringify(requestData, null, 2)}`);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      logs.push(`📥 Statut réponse: ${response.status} ${response.statusText}`);

      const responseText = await response.text();
      logs.push(`📄 Réponse brute: ${responseText}`);

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
        logs.push(`✅ JSON parsé avec succès`);
      } catch (parseError) {
        logs.push(`❌ Erreur parsing JSON: ${parseError}`);
        throw new Error(`Erreur parsing: ${parseError}`);
      }

      if (response.ok) {
        logs.push(`🎉 Test réussi!`);
        setResult({
          success: true,
          data: parsedResponse,
          logs
        });
      } else {
        logs.push(`❌ Erreur API: ${parsedResponse.error || 'Erreur inconnue'}`);
        setResult({
          success: false,
          error: parsedResponse.error || 'Erreur API',
          logs
        });
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
      logs.push(`🔥 Erreur critique: ${errorMsg}`);
      
      setResult({
        success: false,
        error: errorMsg,
        logs
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    testApi,
    isLoading,
    result,
    clearResult: () => setResult(null)
  };
};
