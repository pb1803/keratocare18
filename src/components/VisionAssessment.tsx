import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronLeft, ChevronRight, AlertCircle, Target, Calendar } from "lucide-react";

interface AssessmentState {
  question1: string;
  question2: string[];
  question3: number;
  question4: string[];
  currentStep: number;
  isCompleted: boolean;
}

const VisionAssessment = () => {
  const [assessment, setAssessment] = useState<AssessmentState>({
    question1: "",
    question2: [],
    question3: 5,
    question4: [],
    currentStep: 1,
    isCompleted: false,
  });

  const [error, setError] = useState("");

  const totalSteps = 4;
  const progress = (assessment.currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (assessment.currentStep === 1 && !assessment.question1) {
      setError("Please select an option to continue");
      return;
    }
    if (assessment.currentStep === 2 && assessment.question2.length === 0) {
      setError("Please select at least one challenge");
      return;
    }
    if (assessment.currentStep === 4 && assessment.question4.length === 0) {
      setError("Please select at least one option");
      return;
    }

    setError("");
    if (assessment.currentStep < totalSteps) {
      setAssessment({ ...assessment, currentStep: assessment.currentStep + 1 });
    } else {
      setAssessment({ ...assessment, isCompleted: true });
    }
  };

  const handlePrevious = () => {
    setError("");
    if (assessment.currentStep > 1) {
      setAssessment({ ...assessment, currentStep: assessment.currentStep - 1 });
    }
  };

  const toggleCheckbox = (question: "question2" | "question4", value: string) => {
    const current = assessment[question];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setAssessment({ ...assessment, [question]: updated });
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (assessment.isCompleted) {
    const riskLevel = assessment.question3 >= 7 ? "High Risk" : assessment.question3 >= 4 ? "Moderate Risk" : "Low Risk";
    const probability = assessment.question3 >= 7 ? 92 : assessment.question3 >= 4 ? 87 : 75;
    
    return (
      <section id="assessment" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Your Personalized Results</h2>
            <p className="text-center text-muted-foreground mb-12">Based on your assessment, here's what we found</p>

            <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
              {/* Risk Level */}
              <Card className="p-8 card-hover">
                <AlertCircle className={`w-12 h-12 mb-4 ${riskLevel === "High Risk" ? "text-destructive" : riskLevel === "Moderate Risk" ? "text-orange" : "text-secondary"}`} />
                <h3 className="text-2xl font-bold mb-2">Risk Level Assessment</h3>
                <div className={`text-3xl font-bold mb-2 ${riskLevel === "High Risk" ? "text-destructive" : riskLevel === "Moderate Risk" ? "text-orange" : "text-secondary"}`}>
                  {riskLevel}
                </div>
                <p className="text-muted-foreground">
                  Your vision pattern suggests {riskLevel.toLowerCase()} keratoconus indicators requiring specialist attention.
                </p>
              </Card>

              {/* Improvement Potential */}
              <Card className="p-8 card-hover">
                <Target className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Improvement Potential</h3>
                <div className="relative w-32 h-32 mx-auto my-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--success-green))"
                      strokeWidth="8"
                      strokeDasharray={`${probability * 2.51} 251.2`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-secondary">{probability}%</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-center">
                  High probability of vision improvement with specialty contact lenses
                </p>
              </Card>

              {/* Treatment Timeline */}
              <Card className="p-8 card-hover">
                <Calendar className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Treatment Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <div className="font-semibold">Corneal Mapping (Week 1)</div>
                      <div className="text-sm text-muted-foreground">Advanced 3D imaging</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <div className="font-semibold">Custom Lens Design (Week 2)</div>
                      <div className="text-sm text-muted-foreground">AI-optimized parameters</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <div className="font-semibold">Fitting & Training (Week 3)</div>
                      <div className="text-sm text-muted-foreground">Professional guidance</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <div className="font-semibold">Follow-up (Week 4)</div>
                      <div className="text-sm text-muted-foreground">Ongoing support</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recommended Actions */}
              <Card className="p-8 card-hover">
                <CheckCircle2 className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Recommended Actions</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>Schedule consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>Get corneal mapping done</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>Discuss lens options</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>Insurance verification</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button size="lg" onClick={scrollToContact} className="bg-secondary hover:bg-secondary/90 text-lg px-8 py-6">
                Book Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <a href="tel:+917276861131">Call Now: +91 72768 61131</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="assessment" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Your Personalized Vision Assessment</h2>
          <p className="text-center text-muted-foreground mb-8">Answer 4 quick questions to discover your vision improvement potential</p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {assessment.currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-secondary">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Questions */}
          <Card className="p-8 animate-scale-in">
            {/* Question 1 */}
            {assessment.currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">How would you describe your current vision?</h3>
                <div className="space-y-3">
                  {[
                    { value: "clear", label: "Crystal Clear", desc: "Sharp, focused vision" },
                    { value: "mostly-clear", label: "Mostly Clear", desc: "Slight blurriness at times" },
                    { value: "often-blurry", label: "Often Blurry", desc: "Frequent focus issues" },
                    { value: "distorted", label: "Distorted/Wavy", desc: "Significant distortion" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAssessment({ ...assessment, question1: option.value })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        assessment.question1 === option.value
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2 */}
            {assessment.currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Which challenges affect your daily life?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply</p>
                <div className="space-y-3">
                  {[
                    { value: "night-driving", label: "Night Driving", desc: "Halos, glare at night" },
                    { value: "computer", label: "Computer Work", desc: "Screen fatigue, focus issues" },
                    { value: "light-sensitivity", label: "Light Sensitivity", desc: "Discomfort in bright light" },
                    { value: "reading", label: "Reading", desc: "Difficulty with near vision" },
                    { value: "sports", label: "Sports/Activities", desc: "Performance limitations" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleCheckbox("question2", option.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        assessment.question2.includes(option.value)
                          ? "border-secondary bg-success-green-light"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.desc}</div>
                        </div>
                        {assessment.question2.includes(option.value) && (
                          <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3 */}
            {assessment.currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Rate your vision distortion severity</h3>
                <div className="py-8">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={assessment.question3}
                    onChange={(e) => setAssessment({ ...assessment, question3: parseInt(e.target.value) })}
                    className="w-full h-3 bg-neutral-light-gray rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-muted-foreground">1 (Mild)</span>
                    <span className="text-2xl font-bold text-secondary">{assessment.question3}</span>
                    <span className="text-muted-foreground">10 (Severe)</span>
                  </div>
                  <div className="text-center mt-4 text-lg font-semibold">
                    {assessment.question3 <= 3 ? "Mild" : assessment.question3 <= 6 ? "Moderate" : "Severe"}
                  </div>
                </div>
              </div>
            )}

            {/* Question 4 */}
            {assessment.currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">What vision corrections have you tried?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply</p>
                <div className="space-y-3">
                  {[
                    { value: "glasses", label: "Regular Glasses", desc: "Standard prescription glasses" },
                    { value: "soft-contacts", label: "Soft Contact Lenses", desc: "Typical daily wear contacts" },
                    { value: "rgp", label: "Rigid Gas Permeable (RGP) Contacts", desc: "Specialty contacts" },
                    { value: "surgical", label: "Surgical Correction", desc: "LASIK, corneal implants" },
                    { value: "none", label: "None", desc: "Haven't tried treatments" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleCheckbox("question4", option.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        assessment.question4.includes(option.value)
                          ? "border-secondary bg-success-green-light"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.desc}</div>
                        </div>
                        {assessment.question4.includes(option.value) && (
                          <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={assessment.currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              <Button
                onClick={handleNext}
                className="bg-secondary hover:bg-secondary/90 flex items-center space-x-2"
              >
                <span>{assessment.currentStep === totalSteps ? "See Results" : "Next"}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VisionAssessment;
