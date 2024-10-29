import { ArrowRight, LineChart, MessageSquare, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface DetailedFeatureProps {
  title: string;
  description: string;
  image: string;
}

function DetailedFeature({ title, description, image }: DetailedFeatureProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-12">
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      </div>
      <div className="w-full md:w-1/2">
        <img 
          src={image} 
          alt={title} 
          className="rounded-lg shadow-xl w-full"
        />
      </div>
    </div>
  );
}

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Transform Client Communication with <span className="text-blue-600">ClientPulse</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Track client sentiment, identify trends, and prevent churn with our powerful communication analytics platform.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
          >
            Schedule Demo
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<MessageSquare className="h-8 w-8" />}
          title="Seamless Integration"
          description="Connect your communication channels instantly. Start with Slack or email integration to build your client interaction timeline."
        />
        <FeatureCard
          icon={<BrainCircuit className="h-8 w-8" />}
          title="Smart Sentiment Analysis"
          description="Advanced AI analyzes message tone and content, categorizing interactions as positive, neutral, or negative in real-time."
        />
        <FeatureCard
          icon={<LineChart className="h-8 w-8" />}
          title="Actionable Insights"
          description="Receive instant alerts for negative sentiment patterns or delayed responses, enabling proactive client management."
        />
      </div>

      <div className="space-y-16 mb-16">
        <DetailedFeature
          title="Visual Communication Timeline"
          description="See your entire client communication history at a glance. Our intuitive timeline visualization helps you spot trends, track sentiment changes, and identify potential issues before they become problems."
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500"
        />
        <DetailedFeature
          title="Real-time Sentiment Tracking"
          description="Monitor client satisfaction through advanced sentiment analysis. Watch sentiment trends over time and receive alerts when negative patterns emerge, allowing your team to take immediate action."
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500"
        />
        <DetailedFeature
          title="Team Collaboration Hub"
          description="Keep your entire team aligned with shared insights and automated alerts. When issues arise, the right team members are notified instantly, ensuring quick resolution and maintained client satisfaction."
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=500"
        />
      </div>

      <div className="bg-blue-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Why Teams Choose ClientPulse
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">93%</div>
            <p className="text-gray-600">Improvement in Response Time</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">45%</div>
            <p className="text-gray-600">Reduction in Client Churn</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">2.5x</div>
            <p className="text-gray-600">Increase in Client Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">Automated Monitoring</p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600">
        <p>© 2024 ClientPulse. All rights reserved.</p>
      </div>
    </div>
  );
}