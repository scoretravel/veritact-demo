import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArCameraView } from './-components/ar-camera-view';
import { installationSteps } from './-components/installation-data';
import { InstallationStepsTab } from './-components/installation-steps-tab';
import { PartsToolsTab } from './-components/parts-tools-tab';
import { QaTab } from './-components/qa-tab';
import { SafetySpecsTab } from './-components/safety-specs-tab';

export const Route = createFileRoute('/step-5/installation')({
  component: function InstallationPage() {
    const navigate = useNavigate();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState('steps');

    const currentStep = installationSteps[currentStepIndex];

    const handleNext = function () {
      // Mark current step as completed
      setCompletedSteps(function (prev) {
        if (prev.includes(currentStep.number)) return prev;
        return [...prev, currentStep.number];
      });

      if (currentStepIndex < installationSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        // All steps done — navigate to complete screen
        navigate({ to: '/step-6/complete' });
      }
    };

    const handlePrev = function () {
      if (currentStepIndex > 0) {
        setCurrentStepIndex(currentStepIndex - 1);
      }
    };

    const handleStepSelect = function (index: number) {
      setCurrentStepIndex(index);
    };

    /** Switch to the Q&A tab when "Ask AI" is clicked from a step detail. */
    const handleAskAi = function () {
      setActiveTab('qa');
    };

    return (
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Left: AR camera view */}
        <ArCameraView currentStep={currentStep} completedSteps={completedSteps} />

        {/* Divider line */}
        <div className="w-px bg-gray-200" />

        {/* Right: Tabbed panel */}
        <div className="flex-[2] flex flex-col bg-white overflow-hidden">
          {/* Panel header */}
          <div className="border-b border-gray-200 px-5 py-3.5 flex items-center gap-2">
            <Badge className="bg-primary/15 text-primary border-primary/30 font-mono text-[10px] tracking-wider">
              STEP {currentStep.number}/10
            </Badge>
            <span className="text-sm text-gray-700 font-normal truncate">{currentStep.title}</span>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden gap-0">
            <TabsList
              variant="line"
              className="w-full justify-start px-4 border-b border-gray-200 h-10 rounded-none">
              <TabsTrigger value="steps" className="text-[12px] font-mono tracking-wider">
                Steps
              </TabsTrigger>
              <TabsTrigger value="parts" className="text-[12px] font-mono tracking-wider">
                Parts
              </TabsTrigger>
              <TabsTrigger value="qa" className="text-[12px] font-mono tracking-wider">
                Q&amp;A
              </TabsTrigger>
              <TabsTrigger value="safety" className="text-[12px] font-mono tracking-wider">
                Safety
              </TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="flex-1 overflow-hidden min-h-0">
              <InstallationStepsTab
                currentStepIndex={currentStepIndex}
                completedSteps={completedSteps}
                onStepSelect={handleStepSelect}
                onNext={handleNext}
                onPrev={handlePrev}
                onAskAi={handleAskAi}
              />
            </TabsContent>

            <TabsContent value="parts" className="flex-1 overflow-hidden min-h-0">
              <PartsToolsTab />
            </TabsContent>

            <TabsContent value="qa" className="flex-1 overflow-hidden min-h-0">
              <QaTab currentStepNumber={currentStep.number} />
            </TabsContent>

            <TabsContent value="safety" className="flex-1 overflow-hidden min-h-0">
              <SafetySpecsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  },
});
