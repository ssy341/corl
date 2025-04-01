import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Loader2 } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Types for agencies and testing items
interface TestingAgency {
  id: number;
  code: string;
  nameEn: string;
  nameCn: string;
}

interface TestingItem {
  id: number;
  code: string;
  nameEn: string;
  nameCn: string;
  unit: string;
}

// Form schema
const testingRecordSchema = z.object({
  agencyId: z.coerce.number(),
  sampleId: z.string().min(3, {
    message: "Sample ID must be at least 3 characters",
  }),
  sampleDate: z.date(),
  sampleLocation: z.string().optional(),
  coalType: z.string().optional(),
  testDate: z.date(),
  testReport: z.string().optional(),
  notes: z.string().optional(),
  testResults: z.array(
    z.object({
      itemCode: z.string(),
      value: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Value must be a number",
      }),
      weight: z.string().optional().refine((val) => val === undefined || val === "" || !isNaN(parseFloat(val)), {
        message: "Weight must be a number if provided",
      }),
    })
  ).min(1, { message: "At least one test result is required" }),
});

type TestingRecordFormValues = z.infer<typeof testingRecordSchema>;

interface TestingRecordFormProps {
  onSuccess?: () => void;
}

export default function TestingRecordForm({ onSuccess }: TestingRecordFormProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [agencies, setAgencies] = useState<TestingAgency[]>([]);
  const [testingItems, setTestingItems] = useState<TestingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [availableItems, setAvailableItems] = useState<TestingItem[]>([]);

  const form = useForm<TestingRecordFormValues>({
    resolver: zodResolver(testingRecordSchema),
    defaultValues: {
      sampleId: "",
      sampleDate: new Date(),
      testDate: new Date(),
      testResults: [{ itemCode: "", value: "", weight: "" }],
    },
  });

  // Fetch agencies and testing items
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch testing agencies
        const agenciesResponse = await apiRequest("GET", "/api/testing-agencies");
        const agenciesData = await agenciesResponse.json();
        
        if (agenciesData.success) {
          setAgencies(agenciesData.data);
        }
        
        // Fetch testing items
        const itemsResponse = await apiRequest("GET", "/api/testing-items");
        const itemsData = await itemsResponse.json();
        
        if (itemsData.success) {
          setTestingItems(itemsData.data);
          setAvailableItems(itemsData.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast({
          title: language === 'en' ? "Error" : "错误",
          description: language === 'en' ? "Failed to load form data" : "加载表单数据失败",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchData();
  }, [language, toast]);

  // Update available items when selected items change
  useEffect(() => {
    if (testingItems.length > 0) {
      setAvailableItems(testingItems.filter(item => !selectedItems.includes(item.code)));
    }
  }, [selectedItems, testingItems]);

  // Update selected items when form values change
  useEffect(() => {
    const results = form.getValues().testResults || [];
    setSelectedItems(results.map(r => r.itemCode).filter(Boolean));
  }, [form.getValues().testResults, form]);

  const onSubmit = async (data: TestingRecordFormValues) => {
    try {
      setSubmitting(true);
      
      // Format data for API
      const formattedData = {
        agencyId: data.agencyId,
        sampleId: data.sampleId,
        sampleDate: format(data.sampleDate, "yyyy-MM-dd"),
        sampleLocation: data.sampleLocation || null,
        coalType: data.coalType || null,
        testDate: format(data.testDate, "yyyy-MM-dd"),
        testReport: data.testReport || null,
        notes: data.notes || null,
        // Format results array according to API expectations
        results: data.testResults.map(result => ({
          itemCode: result.itemCode,
          value: result.value,
          weight: result.weight || "1", // Default weight to 1 if not provided
        }))
      };
      
      const response = await apiRequest("POST", "/api/testing-records", formattedData);
      const responseData = await response.json();
      
      if (response.ok && responseData.success) {
        toast({
          title: language === 'en' ? "Success" : "成功",
          description: language === 'en' ? "Testing record submitted successfully" : "测试记录提交成功",
        });
        
        // Reset form
        form.reset({
          agencyId: 0, // Use 0 as a default/empty value for number
          sampleId: "",
          sampleDate: new Date(),
          sampleLocation: "",
          coalType: "",
          testDate: new Date(),
          testReport: "",
          notes: "",
          testResults: [{ itemCode: "", value: "", weight: "" }],
        });
        
        setSelectedItems([]);
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(responseData.message || "Failed to submit testing record");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: language === 'en' ? "Error" : "错误",
        description: error instanceof Error 
          ? error.message 
          : language === 'en' 
            ? "Failed to submit testing record" 
            : "提交测试记录失败",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const addTestResult = () => {
    const currentResults = form.getValues().testResults || [];
    form.setValue("testResults", [...currentResults, { itemCode: "", value: "", weight: "" }]);
  };

  const removeTestResult = (index: number) => {
    const currentResults = form.getValues().testResults || [];
    if (currentResults.length > 1) {
      // Remove the item from selectedItems if it has a value
      const itemToRemove = currentResults[index]?.itemCode;
      if (itemToRemove) {
        setSelectedItems(prev => prev.filter(code => code !== itemToRemove));
      }
      
      const newResults = [...currentResults];
      newResults.splice(index, 1);
      form.setValue("testResults", newResults);
    }
  };

  // Utility function to get localized name based on language
  const getName = (nameEn: string, nameCn: string) => {
    return language === 'en' ? nameEn : nameCn;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-500">
              {language === 'en' ? "Loading form..." : "加载表单中..."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Submit Testing Record" : "提交检测记录"}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? "Enter coal quality testing results" 
            : "输入煤质检测结果"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agency Selection */}
              <FormField
                control={form.control}
                name="agencyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? "Testing Agency" : "检测机构"}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'en' ? "Select agency" : "选择检测机构"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agencies.map((agency) => (
                          <SelectItem key={agency.id} value={agency.id.toString()}>
                            {getName(agency.nameEn, agency.nameCn)} ({agency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sample ID */}
              <FormField
                control={form.control}
                name="sampleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? "Sample ID" : "样本ID"}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'en' ? "Enter sample ID" : "输入样本ID"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sample Date */}
              <FormField
                control={form.control}
                name="sampleDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{language === 'en' ? "Sample Date" : "采样日期"}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{language === 'en' ? "Select date" : "选择日期"}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Test Date */}
              <FormField
                control={form.control}
                name="testDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{language === 'en' ? "Test Date" : "检测日期"}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{language === 'en' ? "Select date" : "选择日期"}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sample Location */}
              <FormField
                control={form.control}
                name="sampleLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? "Sample Location" : "采样地点"}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'en' ? "Enter location" : "输入地点"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Coal Type */}
              <FormField
                control={form.control}
                name="coalType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? "Coal Type" : "煤炭类型"}</FormLabel>
                    <FormControl>
                      <Input placeholder={language === 'en' ? "Enter coal type" : "输入煤炭类型"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Test Report */}
            <FormField
              control={form.control}
              name="testReport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? "Test Report ID" : "测试报告ID"}</FormLabel>
                  <FormControl>
                    <Input placeholder={language === 'en' ? "Enter report ID" : "输入报告ID"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Test Results */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {language === 'en' ? "Test Results" : "测试结果"}
                </h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addTestResult}
                  disabled={availableItems.length === 0}
                >
                  {language === 'en' ? "Add Result" : "添加结果"}
                </Button>
              </div>
              
              <div className="space-y-4">
                {form.watch("testResults")?.map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border p-3 rounded-md">
                    {/* Item Code */}
                    <div className="md:col-span-4">
                      <FormField
                        control={form.control}
                        name={`testResults.${index}.itemCode`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'en' ? "Parameter" : "参数"}</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                // Remove previous value from selectedItems if exists
                                const prevValue = form.getValues().testResults[index]?.itemCode;
                                if (prevValue) {
                                  setSelectedItems(prev => prev.filter(code => code !== prevValue));
                                }
                                
                                // Add new value to selectedItems
                                if (value) {
                                  setSelectedItems(prev => [...prev, value]);
                                }
                                
                                field.onChange(value);
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={language === 'en' ? "Select parameter" : "选择参数"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {/* Show the currently selected item if it exists */}
                                {field.value && testingItems.find(item => item.code === field.value) && (
                                  <SelectItem key={field.value} value={field.value}>
                                    {getName(
                                      testingItems.find(item => item.code === field.value)?.nameEn || "",
                                      testingItems.find(item => item.code === field.value)?.nameCn || ""
                                    )} ({field.value})
                                  </SelectItem>
                                )}
                                
                                {/* Show all available items */}
                                {availableItems.map((item) => (
                                  <SelectItem key={item.code} value={item.code}>
                                    {getName(item.nameEn, item.nameCn)} ({item.code})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Value */}
                    <div className="md:col-span-4">
                      <FormField
                        control={form.control}
                        name={`testResults.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'en' ? "Value" : "值"}</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                placeholder={language === 'en' ? "Enter value" : "输入值"} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Weight */}
                    <div className="md:col-span-3">
                      <FormField
                        control={form.control}
                        name={`testResults.${index}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'en' ? "Weight" : "权重"}</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                placeholder={language === 'en' ? "Default: 1" : "默认: 1"} 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              {language === 'en' ? "Optional" : "可选"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Remove button */}
                    <div className="md:col-span-1 flex justify-end">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => removeTestResult(index)}
                        disabled={form.watch("testResults").length <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? "Notes" : "备注"}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={language === 'en' ? "Enter any additional notes" : "输入任何附加说明"} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {language === 'en' ? "Submit Testing Record" : "提交检测记录"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <p className="text-xs text-gray-500">
          {language === 'en' 
            ? "All fields marked with * are required."
            : "标有 * 的字段为必填项。"}
        </p>
      </CardFooter>
    </Card>
  );
}