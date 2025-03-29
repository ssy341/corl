import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define the consultation schema
const consultationSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z.string({
    required_error: 'Please select a service type.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

export default function ConsultationPage() {
  const { t } = useTranslation();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  
  // Define form
  const form = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      serviceType: '',
      message: '',
    },
  });
  
  // Define mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: ConsultationValues) => {
      return apiRequest('POST', '/api/consultation-requests', data);
    },
    onSuccess: () => {
      toast.success(t('contact.success'));
      // Simulate AI response after submission
      setTimeout(() => {
        setAiResponse(
          'Based on your inquiry, I recommend scheduling a detailed assessment with our coal monitoring experts. Our advanced drone-based stockpile measurement system would be particularly suitable for your requirements. Would you like to receive a detailed proposal with pricing options?'
        );
      }, 1500);
    },
    onError: () => {
      toast.error(t('contact.error'));
    },
  });
  
  // Form submission handler
  function onSubmit(data: ConsultationValues) {
    mutation.mutate(data);
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('consultation.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('consultation.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Consultation form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6">{t('contact.title')}</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.company')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.phone')}</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.service')}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="coal-storage-monitoring">Coal Storage Monitoring</SelectItem>
                            <SelectItem value="weight-estimation">Weight Estimation</SelectItem>
                            <SelectItem value="price-estimation">Price Estimation</SelectItem>
                            <SelectItem value="product-collateral">Product Collateral</SelectItem>
                            <SelectItem value="transport">Transport</SelectItem>
                            <SelectItem value="quality-testing">Quality Testing</SelectItem>
                            <SelectItem value="industry-consultation">Industry Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your inquiry" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient text-white" 
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Sending...' : t('contact.submit')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* AI Consultation Preview */}
          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100 h-full">
              <h2 className="text-2xl font-semibold mb-6">AI Consultation Assistant</h2>
              
              <div className="space-y-8">
                {/* AI Chat Interface */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  {aiResponse ? (
                    <>
                      {/* User message */}
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                          <span className="text-primary text-xl">👤</span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-gray-800">
                              {form.getValues('message') || 'Submit the form to start an AI consultation'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI response */}
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <span className="text-primary text-xl">🤖</span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <p className="text-gray-800">{aiResponse}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-2xl">🤖</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">AI Consultation</h3>
                      <p className="text-gray-600 mb-4">
                        Fill out the form to start a personalized consultation with our AI assistant.
                      </p>
                      <p className="text-sm text-gray-500">
                        Powered by the deepseek-r1 model, our AI provides expert coal industry advice.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Expert Coal Knowledge</h3>
                      <p className="text-sm text-gray-600">Trained on extensive coal industry data and best practices</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Personalized Recommendations</h3>
                      <p className="text-sm text-gray-600">Get tailored advice based on your specific needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">24/7 Availability</h3>
                      <p className="text-sm text-gray-600">Get immediate responses at any time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}