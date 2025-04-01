import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ClipboardList,
  Search,
  BarChart4,
  Loader2,
  FileText,
  Download,
  Eye
} from "lucide-react";

import TestingRecordForm from "@/components/testing/TestingRecordForm";

// Types for the testing records
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

interface TestResult {
  itemCode: string;
  value: string | number;
  weight?: string | number;
}

interface TestingRecord {
  id: number;
  agencyId: number;
  userId: number | null;
  sampleId: string;
  sampleDate: string;
  sampleLocation: string | null;
  coalType: string | null;
  testDate: string;
  testReport: string | null;
  results: TestResult[];
  weightedResults: Record<string, number> | null;
  notes: string | null;
  status: string;
  createdAt: string;
}

export default function TestingRecords() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [records, setRecords] = useState<TestingRecord[]>([]);
  const [agencies, setAgencies] = useState<TestingAgency[]>([]);
  const [testingItems, setTestingItems] = useState<TestingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<TestingRecord | null>(null);
  const [showWeightedDialog, setShowWeightedDialog] = useState(false);

  // Fetch testing records, agencies, and items
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch testing records
        const recordsResponse = await apiRequest("GET", "/api/testing-records");
        const recordsData = await recordsResponse.json();
        
        if (recordsData.success) {
          setRecords(recordsData.data);
        }
        
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
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(language === 'en' ? "Failed to load data" : "加载数据失败");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [language]);

  // Utility function to get the agency name by ID
  const getAgencyName = (agencyId: number) => {
    const agency = agencies.find(a => a.id === agencyId);
    if (!agency) return "N/A";
    return language === 'en' ? agency.nameEn : agency.nameCn;
  };

  // Utility function to get testing item name by code
  const getItemName = (itemCode: string) => {
    const item = testingItems.find(i => i.code === itemCode);
    if (!item) return itemCode;
    return language === 'en' ? item.nameEn : item.nameCn;
  };

  // Utility function to get item unit by code
  const getItemUnit = (itemCode: string) => {
    const item = testingItems.find(i => i.code === itemCode);
    return item?.unit || "";
  };

  // Function to view record details
  const viewRecordDetails = (record: TestingRecord) => {
    setSelectedRecord(record);
  };

  // Function to view weighted results
  const viewWeightedResults = (record: TestingRecord) => {
    setSelectedRecord(record);
    setShowWeightedDialog(true);
  };

  // Function to refresh data after a new record is added
  const handleRecordAdded = async () => {
    try {
      setLoading(true);
      
      // Fetch testing records
      const recordsResponse = await apiRequest("GET", "/api/testing-records");
      const recordsData = await recordsResponse.json();
      
      if (recordsData.success) {
        setRecords(recordsData.data);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error refreshing data:", err);
      setLoading(false);
    }
  };

  // Function to calculate weighted average for a record that doesn't have it
  const calculateWeightedAverage = async (recordId: number) => {
    try {
      setLoading(true);
      
      const response = await apiRequest("GET", `/api/testing-records/${recordId}/weighted-average`);
      const data = await response.json();
      
      if (data.success) {
        // Update the record in the local state
        setRecords(prevRecords => 
          prevRecords.map(record => 
            record.id === recordId 
              ? { ...record, weightedResults: data.data } 
              : record
          )
        );
        
        toast({
          title: language === 'en' ? "Success" : "成功",
          description: language === 'en' ? "Weighted average calculated" : "已计算加权平均值",
        });
      } else {
        throw new Error(data.message || "Failed to calculate weighted average");
      }
    } catch (error) {
      console.error("Error calculating weighted average:", error);
      toast({
        title: language === 'en' ? "Error" : "错误",
        description: error instanceof Error 
          ? error.message 
          : language === 'en' 
            ? "Failed to calculate weighted average" 
            : "计算加权平均值失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-gray-500">
              {language === 'en' ? "Loading records..." : "加载记录中..."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10">
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  {language === 'en' ? "Retry" : "重试"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'Coal Quality Testing Records' : '煤质检测记录'}
            </h1>
            <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'View and manage coal quality testing records and analysis results.' 
                : '查看和管理煤质检测记录和分析结果。'}
            </p>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="records" className="w-full">
            <TabsList className="mb-6 mx-auto flex justify-center">
              <TabsTrigger value="records" className="min-w-[150px]">
                <ClipboardList className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Testing Records' : '检测记录'}
              </TabsTrigger>
              <TabsTrigger value="add-record" className="min-w-[150px]">
                <FileText className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Add New Record' : '添加新记录'}
              </TabsTrigger>
              <TabsTrigger value="analysis" className="min-w-[150px]">
                <BarChart4 className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Analysis' : '分析'}
              </TabsTrigger>
            </TabsList>
            
            {/* Testing Records Tab */}
            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {language === 'en' ? 'All Testing Records' : '所有检测记录'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' 
                          ? 'View and manage coal quality testing results' 
                          : '查看和管理煤质检测结果'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder={language === 'en' ? "Search records..." : "搜索记录..."}
                          className="pl-8 h-9 w-[200px] rounded-md border border-input bg-background text-sm shadow-sm"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Export' : '导出'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{language === 'en' ? 'ID' : 'ID'}</TableHead>
                          <TableHead>{language === 'en' ? 'Sample ID' : '样本ID'}</TableHead>
                          <TableHead>{language === 'en' ? 'Agency' : '检测机构'}</TableHead>
                          <TableHead>{language === 'en' ? 'Sample Date' : '采样日期'}</TableHead>
                          <TableHead>{language === 'en' ? 'Test Date' : '检测日期'}</TableHead>
                          <TableHead>{language === 'en' ? 'Status' : '状态'}</TableHead>
                          <TableHead className="text-right">{language === 'en' ? 'Actions' : '操作'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {records.length > 0 ? (
                          records.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell className="font-medium">{record.id}</TableCell>
                              <TableCell>{record.sampleId}</TableCell>
                              <TableCell>{getAgencyName(record.agencyId)}</TableCell>
                              <TableCell>{record.sampleDate}</TableCell>
                              <TableCell>{record.testDate}</TableCell>
                              <TableCell>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                                  ${record.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'}`}>
                                  {record.status === 'completed' 
                                    ? (language === 'en' ? 'Completed' : '已完成') 
                                    : (language === 'en' ? 'Pending' : '待处理')}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => viewRecordDetails(record)}
                                      >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                      <DialogHeader>
                                        <DialogTitle>
                                          {language === 'en' ? 'Record Details' : '记录详情'} - {record.sampleId}
                                        </DialogTitle>
                                        <DialogDescription>
                                          {language === 'en' 
                                            ? 'Detailed information about this testing record' 
                                            : '关于此检测记录的详细信息'}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h3 className="font-semibold mb-2">
                                              {language === 'en' ? 'Sample Information' : '样本信息'}
                                            </h3>
                                            <div className="space-y-2">
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Sample ID:' : '样本ID：'}</div>
                                                <div className="text-sm col-span-2">{record.sampleId}</div>
                                              </div>
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Sample Date:' : '采样日期：'}</div>
                                                <div className="text-sm col-span-2">{record.sampleDate}</div>
                                              </div>
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Location:' : '地点：'}</div>
                                                <div className="text-sm col-span-2">{record.sampleLocation || 'N/A'}</div>
                                              </div>
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Coal Type:' : '煤炭类型：'}</div>
                                                <div className="text-sm col-span-2">{record.coalType || 'N/A'}</div>
                                              </div>
                                            </div>
                                          </div>
                                          <div>
                                            <h3 className="font-semibold mb-2">
                                              {language === 'en' ? 'Testing Information' : '检测信息'}
                                            </h3>
                                            <div className="space-y-2">
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Agency:' : '检测机构：'}</div>
                                                <div className="text-sm col-span-2">{getAgencyName(record.agencyId)}</div>
                                              </div>
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Test Date:' : '检测日期：'}</div>
                                                <div className="text-sm col-span-2">{record.testDate}</div>
                                              </div>
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Report:' : '报告：'}</div>
                                                <div className="text-sm col-span-2">{record.testReport || 'N/A'}</div>
                                              </div>
                                              <div className="grid grid-cols-3 gap-1">
                                                <div className="text-sm font-medium">{language === 'en' ? 'Status:' : '状态：'}</div>
                                                <div className="text-sm col-span-2">
                                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                    ${record.status === 'completed' 
                                                      ? 'bg-green-100 text-green-800' 
                                                      : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {record.status === 'completed' 
                                                      ? (language === 'en' ? 'Completed' : '已完成') 
                                                      : (language === 'en' ? 'Pending' : '待处理')}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h3 className="font-semibold mb-2">
                                            {language === 'en' ? 'Test Results' : '测试结果'}
                                          </h3>
                                          <Table>
                                            <TableHeader>
                                              <TableRow>
                                                <TableHead>{language === 'en' ? 'Parameter' : '参数'}</TableHead>
                                                <TableHead>{language === 'en' ? 'Value' : '值'}</TableHead>
                                                <TableHead>{language === 'en' ? 'Unit' : '单位'}</TableHead>
                                                <TableHead>{language === 'en' ? 'Weight' : '权重'}</TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {record.results.map((result, index) => (
                                                <TableRow key={index}>
                                                  <TableCell>{getItemName(result.itemCode)}</TableCell>
                                                  <TableCell>{result.value}</TableCell>
                                                  <TableCell>{getItemUnit(result.itemCode)}</TableCell>
                                                  <TableCell>{result.weight || '1'}</TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                        </div>
                                        
                                        {record.weightedResults && Object.keys(record.weightedResults).length > 0 && (
                                          <div>
                                            <h3 className="font-semibold mb-2">
                                              {language === 'en' ? 'Weighted Averages' : '加权平均'}
                                            </h3>
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead>{language === 'en' ? 'Parameter' : '参数'}</TableHead>
                                                  <TableHead>{language === 'en' ? 'Weighted Average' : '加权平均'}</TableHead>
                                                  <TableHead>{language === 'en' ? 'Unit' : '单位'}</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {Object.entries(record.weightedResults).map(([itemCode, value]) => (
                                                  <TableRow key={itemCode}>
                                                    <TableCell>{getItemName(itemCode)}</TableCell>
                                                    <TableCell>{value.toFixed(2)}</TableCell>
                                                    <TableCell>{getItemUnit(itemCode)}</TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </div>
                                        )}
                                        
                                        {(!record.weightedResults || Object.keys(record.weightedResults).length === 0) && (
                                          <div className="flex justify-center">
                                            <Button
                                              onClick={() => calculateWeightedAverage(record.id)}
                                              disabled={loading}
                                            >
                                              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                              {language === 'en' ? 'Calculate Weighted Average' : '计算加权平均值'}
                                            </Button>
                                          </div>
                                        )}
                                        
                                        {record.notes && (
                                          <div>
                                            <h3 className="font-semibold mb-2">
                                              {language === 'en' ? 'Notes' : '备注'}
                                            </h3>
                                            <p className="text-sm">{record.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => viewWeightedResults(record)}
                                    disabled={!record.weightedResults || Object.keys(record.weightedResults || {}).length === 0}
                                  >
                                    <BarChart4 className="h-4 w-4" />
                                    <span className="sr-only">Weighted Average</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center">
                                <ClipboardList className="h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-gray-500">
                                  {language === 'en' 
                                    ? 'No testing records found. Add your first record.' 
                                    : '没有找到测试记录。添加您的第一条记录。'}
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Add New Record Tab */}
            <TabsContent value="add-record">
              <TestingRecordForm onSuccess={handleRecordAdded} />
            </TabsContent>
            
            {/* Analysis Tab */}
            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Coal Quality Analysis' : '煤质分析'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Analyze coal quality testing data over time' 
                      : '分析煤质检测数据的时间趋势'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <BarChart4 className="h-16 w-16 text-gray-300" />
                    <h3 className="text-lg font-medium">
                      {language === 'en' ? 'Coming Soon' : '即将推出'}
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      {language === 'en' 
                        ? 'Advanced analytics and visualization tools are currently under development. Check back soon!' 
                        : '高级分析和可视化工具正在开发中。请稍后再来查看！'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Weighted Results Dialog */}
      <AlertDialog open={showWeightedDialog} onOpenChange={setShowWeightedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'en' ? 'Weighted Average Results' : '加权平均结果'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'en' 
                ? 'Calculated weighted averages based on test results and assigned weights.' 
                : '基于测试结果和分配的权重计算得出的加权平均值。'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="mt-4">
            {selectedRecord && selectedRecord.weightedResults && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'en' ? 'Parameter' : '参数'}</TableHead>
                    <TableHead>{language === 'en' ? 'Weighted Average' : '加权平均'}</TableHead>
                    <TableHead>{language === 'en' ? 'Unit' : '单位'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(selectedRecord.weightedResults).map(([itemCode, value]) => (
                    <TableRow key={itemCode}>
                      <TableCell>{getItemName(itemCode)}</TableCell>
                      <TableCell>{value.toFixed(2)}</TableCell>
                      <TableCell>{getItemUnit(itemCode)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowWeightedDialog(false)}>
              {language === 'en' ? 'Close' : '关闭'}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}