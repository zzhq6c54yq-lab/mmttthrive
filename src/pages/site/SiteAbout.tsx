import { Card } from "@/components/ui/card";
import { Heart, Eye, Target, Users } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SiteAbout = () => {
  return (
    <div className="bg-black">
      <SiteHeroSection
        title="Built by People Who Understand"
        subtitle="Because mental health deserves more than an app."
      />

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">

        {/* Mission */}
        <div className="mb-16">
          <Card className="bg-black border-[#D4AF37]/20 p-12 text-center">
            <Target className="w-16 h-16 text-bronze-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Mission</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              To make mental health support simple, affordable, modern, and accessible to everyone who needs it.
            </p>
          </Card>
        </div>

        {/* Vision */}
        <div className="mb-16">
          <Card className="bg-black border-[#D4AF37]/20 p-12 text-center">
            <Eye className="w-16 h-16 text-bronze-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Vision</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              A world where high-quality emotional support is available anytime, anywhere — where getting help is as easy as opening an app.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black border-[#D4AF37]/20 p-8">
              <Heart className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Compassion</h3>
              <p className="text-foreground/60">Every interaction is designed with empathy and care</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Target className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Evidence-Based</h3>
              <p className="text-foreground/60">All our methods are backed by clinical research</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Users className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Quality for Everyone</h3>
              <p className="text-foreground/60">Premium care should be accessible, not exclusive</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Heart className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Clinician-First</h3>
              <p className="text-foreground/60">Happy therapists provide better care</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Target className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Innovation</h3>
              <p className="text-foreground/60">Using technology to enhance human connection</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Users className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Integrity</h3>
              <p className="text-foreground/60">Always doing what's right for our users</p>
            </Card>
          </div>
        </div>

        {/* Mental Health Starts Here */}
        <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-center mb-6" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Mental Health Starts Here</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto text-center mb-12">
            Mental health doesn't start with an app. It starts with how we treat each other. Thrive MT was born because the way mental health is built today doesn't feel human enough. Most platforms lead with features or credentials. We lead with presence, kindness, and real connection before downloads.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Users className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Showing Up Where Others Don't</h3>
              <p className="text-foreground/60">
                We go where others won't. Unscripted, human spaces. Conversations with strangers. Open campfires. Questions answered by many voices, not one authority. In mental health, listening and lived experience matter just as much as expertise.
              </p>
            </Card>
            
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Heart className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Healing Together</h3>
              <p className="text-foreground/60">
                Healing can be shared. Listening is powerful. Community belongs in mental health. By showing up as real humans, we build trust that cannot be copied. Technology can be replicated, features rebuilt, but trust and connection take time.
              </p>
            </Card>
            
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Target className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Accessible to Everyone</h3>
              <p className="text-foreground/60">
                Mental health should never be out of reach. Our sliding scale and community service programs make support available to all while encouraging giving back. Healing and helping go hand in hand. Caring for others strengthens care for yourself.
              </p>
            </Card>
            
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Eye className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">A Standard, Not Just an App</h3>
              <p className="text-foreground/60">
                Thrive MT is not just an app. It is a standard. It is what mental health should feel like. It exists because human connection cannot wait and no one should have to wait to be heard, understood, or supported.
              </p>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SiteAbout;
