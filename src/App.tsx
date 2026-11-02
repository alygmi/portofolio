import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBento } from './components/HeroBento';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsAndEducation } from './components/SkillsAndEducation';
import { ProtectedContact } from './components/ProtectedContact';
import { Footer } from './components/Footer';
import { IntroLoader } from './components/IntroLoader';
import { useButterScroll } from './utils/useButterScroll';

export function App() {
  const [, setIntroDone] = useState(false);

  // Activate butter-smooth inertia scroll across sections (yields automatically to #experience step-lock)
  useButterScroll();

  return (
    <div className="min-h-screen bg-zinc-50 bg-grid-pattern text-zinc-900">
      <IntroLoader onComplete={() => setIntroDone(true)} />

      <Navbar />

      <main>
        <HeroBento />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsAndEducation />
        <ProtectedContact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
