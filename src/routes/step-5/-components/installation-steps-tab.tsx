import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { installationSteps } from './installation-data';
import { StepDetailContent } from './step-detail-content';

type InstallationStepsTabProps = {
  currentStepIndex: number;
  completedSteps: number[];
  onStepSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onAskAi: () => void;
};

/** Tab content showing the list of installation steps with navigation. */
export const InstallationStepsTab = function ({
  currentStepIndex,
  completedSteps,
  onStepSelect,
  onNext,
  onPrev,
  onAskAi,
}: InstallationStepsTabProps) {
  const isLastStep = currentStepIndex === installationSteps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="space-y-1 p-4">
          {installationSteps.map(function (step, index) {
            const isCurrent = index === currentStepIndex;
            const isCompleted = completedSteps.includes(step.number);

            return (
              <div
                key={step.number}
                className={cn(
                  'flex items-start gap-3 rounded-lg p-3 transition-colors cursor-pointer',
                  isCurrent && 'bg-primary/10 border border-primary/20',
                  !isCurrent && 'hover:bg-gray-900/5 border border-transparent'
                )}
                onClick={function () {
                  onStepSelect(index);
                }}>
                {/* Step indicator */}
                <div
                  className={cn(
                    'shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-mono text-[11px] font-semibold border mt-0.5',
                    isCompleted && 'bg-emerald-100 border-emerald-300 text-emerald-600',
                    isCurrent && !isCompleted && 'bg-primary/15 border-primary/30 text-primary',
                    !isCurrent && !isCompleted && 'bg-gray-900/5 border-gray-200 text-gray-400'
                  )}>
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      'text-sm font-normal',
                      isCurrent && 'text-gray-900',
                      isCompleted && !isCurrent && 'text-gray-500',
                      !isCurrent && !isCompleted && 'text-gray-400'
                    )}>
                    {step.title}
                  </div>
                  {isCurrent && (
                    <>
                      <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      <StepDetailContent step={step} onAskAi={onAskAi} />
                    </>
                  )}
                  <span className="font-mono text-[10px] text-gray-300 mt-1 block">
                    ~{step.estimatedMinutes} min
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="border-t border-gray-200 p-4 flex gap-2">
        <Button
          variant="outline"
          disabled={isFirstStep}
          className="flex-1 h-9 text-sm font-normal cursor-pointer disabled:opacity-30"
          onClick={onPrev}>
          &larr; Previous
        </Button>
        <Button
          className="flex-1 h-9 text-sm font-normal cursor-pointer"
          style={{
            boxShadow: '0 0 10px oklch(0.52 0.15 210 / 15%)',
          }}
          onClick={onNext}>
          {isLastStep ? 'Complete' : 'Next Step'} &rarr;
        </Button>
      </div>
    </div>
  );
};
