import { LetterFx, RevealFx, SparkleFx } from '@/app/once-ui/components';
import React, { useState } from 'react';
import { CyberFx, HardGlowFx, RedactFx, CustomSparkleFx} from './Effects';

const ExperienceComponent: React.FC = () => {
  const [effect, setEffect] = useState<string | null>(null);

  const renderExperienceInfo = () => {
    const content = (
      <div className="w-full flex justify-center mb-4 text-lg sm:text-xl">Experience Information</div>
    );

    switch (effect) {
      case 'Reveal':
        return (
          <RevealFx speed="medium" delay={0} translateY={0}>
            {content}
          </RevealFx>
        );
      case 'Letter':
        return (
        <div className="w-full flex justify-center mb-4 text-lg sm:text-xl">
            <LetterFx
                speed="slow"
                trigger="instant"
                charset={['X', '@', '$', 'a', 'H', 'z', 'o', '0', 'y', '#', '?', '*', '0', '1', '+']}
            >
                Experience Information
            </LetterFx>
        </div>
        );
      case 'Sparkle':
        return (
            <div className="w-full flex justify-center mb-4 text-lg sm:text-xl">
            <CustomSparkleFx text='Experience Information' speed="medium"/>
            </div>
        );
      case 'Cyber':
        return <CyberFx>{content}</CyberFx>;
      case 'HardGlow':
        return <HardGlowFx>{content}</HardGlowFx>;
      case 'Redact':
        return <RedactFx>{content}</RedactFx>;

    //   case 'Glitch':
    //     return (
    //       <GlitchFx speed="medium" interval={2500} trigger="instant" continuous>
    //         {content}
    //       </GlitchFx>
    //     );
      default:
        return content;
    }
  };

  return (
    <div className="tabs mt-8">
      <div className="flex max-w-[800px] mx-auto justify-center gap-4 flex-col">
        {renderExperienceInfo()}
        
        <div className="flex max-w-[800px] mx-auto justify-center gap-4">
          <button onClick={() => setEffect('Sparkle')} className="px-3 py-1 text-sm sm:text-base bg-white bg-opacity-15 hover:bg-opacity-25 rounded transition-opacity">
            Sparkle
          </button>
          <button onClick={() => setEffect('Reveal')} className="px-3 py-1 text-sm sm:text-base bg-white bg-opacity-15 hover:bg-opacity-25 rounded transition-opacity">
            Reveal
          </button>
          <button onClick={() => setEffect('Letter')} className="px-3 py-1 text-sm sm:text-base bg-white bg-opacity-15 hover:bg-opacity-25 rounded transition-opacity">
            Glitch
          </button>
        </div>

        <div className="flex max-w-[800px] mx-auto justify-center gap-4">
          <button onClick={() => setEffect('Redact')} className="px-3 py-1 text-sm sm:text-base bg-white bg-opacity-15 hover:bg-opacity-25 rounded transition-opacity">
            Redact
          </button>
          <button onClick={() => setEffect('Cyber')} className="px-3 py-1 text-sm sm:text-base bg-white bg-opacity-15 hover:bg-opacity-25 rounded transition-opacity">
          Cyber
          </button>
          <button onClick={() => setEffect('HardGlow')} className="px-3 py-1 text-sm sm:text-base bg-white bg-opacity-15 hover:bg-opacity-25 rounded transition-opacity">
            Hard Glow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceComponent;
