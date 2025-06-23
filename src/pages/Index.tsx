import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import HenryButton from "@/components/HenryButton";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const { user, profile, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (!profile?.onboarding_completed) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, loading, navigate]);

  const [showCoPayPopup, setShowCoPayPopup] = React.useState(false);
  const { toast } = useToast();
  const { t, isSpanish, toggleLanguage } = useTranslation();

  const IndexScreenManager = () => {
    const [email, setEmail] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      setSubmitted(true);
      toast({
        title: isSpanish ? "¡Gracias!" : "Thank you!",
        description: isSpanish
          ? "Te mantendremos al tanto."
          : "We'll keep you in the loop.",
      });
    };

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t("Unlocking Mental Wellness")}
            </h1>
            <p className="text-gray-300 mb-6">
              {t(
                "Your personalized guide to mental and emotional well-being. Start your journey today."
              )}
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">{t("Get Started")}</Link>
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  {t("Stay Updated")}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t("Subscribe to our newsletter")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-300">
                      {t("Email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("Enter your email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={submitted} className="w-full">
                    {submitted ? t("Subscribed!") : t("Subscribe")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  {t("Explore")}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t("Learn more about our services")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button variant="secondary" asChild>
                    <Link to="/cancer-support">
                      {t("Cancer Support Portal")}
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link to="/career-coaching">{t("Career Coaching")}</Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link to="/meditation-studio">
                      {t("Meditation Studio")}
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link to="/aa-sponsor">{t("AA Sponsor")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {t("Frequently Asked Questions")}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white hover:text-gray-200">
                {t("What is Omni Solus?")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(
                  "Omni Solus is your all-in-one platform for mental and emotional well-being, offering personalized resources and support."
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white hover:text-gray-200">
                {t("How does it work?")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(
                  "Our platform uses AI to tailor resources to your needs, providing tools, guidance, and a supportive community."
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-white hover:text-gray-200">
                {t("Is my data secure?")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(
                  "Yes, we prioritize your privacy with state-of-the-art security measures to protect your personal information."
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t("Ready to Begin?")}
          </h2>
          <p className="text-gray-300 mb-8">
            {t(
              "Join Omni Solus today and take the first step towards a healthier, happier you."
            )}
          </p>
          <Button size="lg" asChild>
            <Link to="/auth">{t("Sign Up Now")}</Link>
          </Button>
        </section>

        <footer className="mt-24 py-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; 2024 Omni Solus. {t("All rights reserved.")}</p>
          <Button
            variant="link"
            onClick={() => setShowCoPayPopup(true)}
            className="mt-4"
          >
            {t("Check Co-Pay Credit Eligibility")}
          </Button>
          <Button variant="link" onClick={toggleLanguage} className="mt-4">
            {isSpanish ? "English" : "Español"}
          </Button>
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <IndexScreenManager />
    </div>
  );
};

export default Index;
