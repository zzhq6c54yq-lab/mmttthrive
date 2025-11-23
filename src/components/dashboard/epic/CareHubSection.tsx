import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Video, ArrowRight, Shield, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DashboardData } from '@/hooks/useTodayDashboard';

interface CareHubSectionProps {
  dashboardData: DashboardData;
}

export const CareHubSection: React.FC<CareHubSectionProps> = ({ dashboardData }) => {
  const navigate = useNavigate();
  const hasTherapist = dashboardData.upcomingAppointments.length > 0;
  const nextAppointment = dashboardData.upcomingAppointments[0];

  if (!hasTherapist) {
    return (
      <div className="space-y-4">
        {/* Card 1: Find Your Therapist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-2 text-shadow">Connect with a Licensed Therapist</h2>
          <p className="text-muted-foreground mb-6">
            Professional therapy matched to your needs
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#D4AF37] mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Licensed & Vetted</h3>
                <p className="text-sm text-muted-foreground">All therapists verified</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#D4AF37] mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                <p className="text-sm text-muted-foreground">Book at your convenience</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#D4AF37] mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Insurance Accepted</h3>
                <p className="text-sm text-muted-foreground">Flexible payment options</p>
              </div>
            </div>
          </div>

          <Button variant="gold" size="lg" onClick={() => navigate('/therapy')} className="w-full md:w-auto">
            Browse Therapists
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Card 2: Build Your Care Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-2 text-shadow">Build Your Care Team</h2>
          <p className="text-muted-foreground mb-6">
            Get matched with 3 therapists in 2 minutes
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#D4AF37]/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-[#D4AF37]">1</span>
              </div>
              <h3 className="font-semibold mb-1">Tell us what you need</h3>
              <p className="text-sm text-muted-foreground">2 min questionnaire</p>
            </div>

            <div className="bg-[#D4AF37]/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-[#D4AF37]">2</span>
              </div>
              <h3 className="font-semibold mb-1">Get 3 therapist matches</h3>
              <p className="text-sm text-muted-foreground">AI-powered matching</p>
            </div>

            <div className="bg-[#D4AF37]/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-[#D4AF37]">3</span>
              </div>
              <h3 className="font-semibold mb-1">Try your first session</h3>
              <p className="text-sm text-muted-foreground">Pricing discussed during consultation</p>
            </div>
          </div>

          <Button variant="gold" size="lg" onClick={() => navigate('/therapy?matching=true')} className="w-full md:w-auto">
            Start Matching (2 minutes)
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  const therapist = nextAppointment.therapist;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-shadow">Your Care Team</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={therapist?.image_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=therapist'}
          alt={therapist?.name || 'Therapist'}
          className="w-16 h-16 rounded-full border-2 border-[#D4AF37]"
        />
        <div>
          <h3 className="text-lg font-bold">{therapist?.name || 'Your Therapist'}</h3>
          <p className="text-sm text-muted-foreground">{therapist?.title || 'Licensed Therapist'}</p>
        </div>
      </div>

      <div className="bg-[#D4AF37]/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <h4 className="font-semibold">Next session</h4>
        </div>
        <p className="text-lg font-bold mb-4">
          {format(new Date(nextAppointment.appointment_date), 'EEEE, MMM d – h:mm a')}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline">
            View details
          </Button>
          <Button size="sm" variant="outline">
            Reschedule
          </Button>
          <Button size="sm" variant="gold">
            <Video className="w-4 h-4 mr-1" />
            Join Video
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">Between sessions</p>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <MessageSquare className="w-4 h-4 mr-2" />
          Send your therapist an update
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <ArrowRight className="w-4 h-4 mr-2" />
          Share today's journal summary
        </Button>
      </div>
    </motion.div>
  );
};
