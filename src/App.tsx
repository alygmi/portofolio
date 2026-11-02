import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { HeroBento } from './components/HeroBento';
import { MigrationShowcase } from './components/MigrationShowcase';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsAndEducation } from './components/SkillsAndEducation';
import { ProtectedContact } from './components/ProtectedContact';
import { Footer } from './components/Footer';
import { useButterScroll } from './utils/useButterScroll';

export function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Activate butter-smooth inertia scroll across sections (yields automatically to #experience step-lock)
  useButterScroll();

  // Global Ctrl+K / Cmd+K shortcut listener to open Command Palette
  useEffect(() => {
    const handleGlobalShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalShortcut);
    return () => window.removeEventListener('keydown', handleGlobalShortcut);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid-pattern text-zinc-100">
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      <main>
        <HeroBento />
        <MigrationShowcase />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsAndEducation />
        <ProtectedContact />
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}

export default App;
