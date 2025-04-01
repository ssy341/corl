import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import Layout from '@/components/Layout';
import { Loader2, Heart, HeartOff, Timer, AlertTriangle, Gavel, Tag, TrendingDown } from 'lucide-react';

interface CoalProduct {
  id: number;
  productCode: string;
  titleCn: string;
  titleEn: string;
  descriptionCn: string | null;
  descriptionEn: string | null;
  coalType: string;
  quantity: number;
  originalPrice: number;
  currentPrice: number;
  location: string;
  quality: Record<string, string | number>;
  imageUrl: string | null;
  status: string;
  disposalType: string;
  auctionEndTime: string | null;
  minDiscountPrice: number | null;
  collateralRatio: number | null;
  riskLevel: string;
  createdAt: string;
  updatedAt: string;
}

const CoalRiskDisposal: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [disposalFilter, setDisposalFilter] = useState<string>('all');

  // 获取所有煤炭产品
  const { data: coalProducts, isLoading, error } = useQuery<{ data: CoalProduct[] }>({
    queryKey: ['/api/coal-products'],
    retry: 1,
  });

  // 处理产品点击事件
  const handleProductClick = (productId: number) => {
    setLocation(`/coal-products/${productId}`);
  };

  // 添加或移除收藏
  const handleToggleFavorite = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    // 实际项目中，这里应该调用API添加/移除收藏
    toast({
      title: language === 'cn' ? '功能提示' : 'Feature Notice',
      description: language === 'cn' 
        ? '收藏功能需要登录后使用' 
        : 'The favorite feature requires login',
    });
  };

  // 参与竞拍
  const handleBid = (e: React.MouseEvent, product: CoalProduct) => {
    e.stopPropagation();
    if (product.disposalType === 'auction') {
      setLocation(`/coal-products/${product.id}/bid`);
    }
  };

  // 立即购买
  const handleBuyNow = (e: React.MouseEvent, product: CoalProduct) => {
    e.stopPropagation();
    setLocation(`/coal-products/${product.id}/purchase`);
  };

  // 格式化价格显示
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'cn' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // 根据风险等级获取显示样式
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // 获取剩余时间显示
  const getTimeRemaining = (endTime: string | null) => {
    if (!endTime) return null;
    
    const end = new Date(endTime);
    const now = new Date();
    
    if (end <= now) return language === 'cn' ? '已结束' : 'Ended';
    
    const totalSeconds = Math.floor((end.getTime() - now.getTime()) / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (days > 0) {
      return language === 'cn' 
        ? `${days}天${hours}小时` 
        : `${days}d ${hours}h`;
    } else if (hours > 0) {
      return language === 'cn' 
        ? `${hours}小时${minutes}分钟` 
        : `${hours}h ${minutes}m`;
    } else {
      return language === 'cn' 
        ? `${minutes}分钟` 
        : `${minutes}m`;
    }
  };

  // 筛选产品
  const filteredProducts = React.useMemo(() => {
    if (!coalProducts?.data) return [];
    
    let result = coalProducts.data;
    
    // 按状态筛选
    if (filter !== 'all') {
      result = result.filter(product => product.status === filter);
    }
    
    // 按风险等级筛选
    if (riskFilter !== 'all') {
      result = result.filter(product => product.riskLevel === riskFilter);
    }
    
    // 按处置方式筛选
    if (disposalFilter !== 'all') {
      result = result.filter(product => product.disposalType === disposalFilter);
    }
    
    return result;
  }, [coalProducts, filter, riskFilter, disposalFilter]);

  // 初始化一些演示数据
  useEffect(() => {
    if (!coalProducts && !isLoading && !error) {
      // 在实际应用中，这里不需要手动添加，因为数据来自API
      console.log('Fetching coal products...');
    }
  }, [coalProducts, isLoading, error]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <span className="ml-2 text-xl font-semibold">
            {language === 'cn' ? '加载中...' : 'Loading...'}
          </span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            {language === 'cn' ? '数据加载失败' : 'Failed to load data'}
          </h2>
          <p className="text-center mb-4">
            {language === 'cn' 
              ? '无法加载煤险处置数据，请稍后再试或联系管理员。' 
              : 'Unable to load coal risk disposal data. Please try again later or contact administrator.'}
          </p>
          <Button onClick={() => window.location.reload()}>
            {language === 'cn' ? '重新加载' : 'Reload'}
          </Button>
        </div>
      </Layout>
    );
  }

  // 模拟数据（实际项目中应该已经有真实数据）
  const mockProducts: CoalProduct[] = [
    {
      id: 1,
      productCode: 'CR-A1001',
      titleCn: '优质动力煤 - 抵押物处置',
      titleEn: 'Premium Thermal Coal - Collateral Disposal',
      descriptionCn: '本批次煤炭为优质动力煤，热值高，灰分低，硫含量适中，适合电厂和工业锅炉使用。',
      descriptionEn: 'This batch of coal is premium thermal coal with high calorific value, low ash content, and moderate sulfur content, suitable for power plants and industrial boilers.',
      coalType: 'thermal',
      quantity: 1000,
      originalPrice: 1200,
      currentPrice: 980,
      location: '山西省朔州市',
      quality: {
        'CV': '6200 kcal/kg',
        'TM': '9%',
        'ASH': '8%',
        'S': '0.6%'
      },
      imageUrl: 'https://images.unsplash.com/photo-1507667522877-ad03f0c7b0e0?q=80&w=3540&auto=format&fit=crop',
      status: 'available',
      disposalType: 'auction',
      auctionEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      minDiscountPrice: null,
      collateralRatio: 0.7,
      riskLevel: 'medium',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      productCode: 'CR-B2002',
      titleCn: '焦煤紧急处置 - 价格优惠',
      titleEn: 'Coking Coal Urgent Disposal - Price Discount',
      descriptionCn: '此批焦煤因金融风险需紧急处置，价格大幅优惠，适合焦化厂采购。',
      descriptionEn: 'This batch of coking coal needs urgent disposal due to financial risk, offering a significant price discount, suitable for coking plants.',
      coalType: 'coking',
      quantity: 800,
      originalPrice: 1500,
      currentPrice: 1100,
      location: '河北省唐山市',
      quality: {
        'VM': '22%',
        'ASH': '7.5%',
        'S': '0.5%',
        'CSR': '65%'
      },
      imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=3540&auto=format&fit=crop',
      status: 'available',
      disposalType: 'discount',
      auctionEndTime: null,
      minDiscountPrice: 1050,
      collateralRatio: 0.65,
      riskLevel: 'high',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      productCode: 'CR-C3003',
      titleCn: '无烟煤 - 抵押物资产',
      titleEn: 'Anthracite Coal - Collateral Asset',
      descriptionCn: '优质无烟煤，热值高，灰分低，挥发分低，是高端工业应用的理想选择。',
      descriptionEn: 'Premium anthracite coal with high calorific value, low ash content, and low volatile matter, ideal for high-end industrial applications.',
      coalType: 'anthracite',
      quantity: 600,
      originalPrice: 1800,
      currentPrice: 1500,
      location: '贵州省六盘水市',
      quality: {
        'FC': '87%',
        'VM': '7%',
        'ASH': '6%',
        'S': '0.4%'
      },
      imageUrl: 'https://images.unsplash.com/photo-1581093577421-17121c1a0252?q=80&w=3474&auto=format&fit=crop',
      status: 'available',
      disposalType: 'auction',
      auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      minDiscountPrice: null,
      collateralRatio: 0.75,
      riskLevel: 'low',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
  ];

  const displayProducts = coalProducts?.data?.length ? filteredProducts : mockProducts;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text mb-4">
            {language === 'cn' ? '煤险处置平台' : 'Coal Risk Disposal Platform'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'cn' 
              ? '通过竞拍或定向价格优惠购买抵押煤炭资产，获取优质煤炭资源的同时把握投资机会。' 
              : 'Purchase collateralized coal assets through auctions or targeted price discounts, seizing investment opportunities while acquiring quality coal resources.'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                {language === 'cn' ? '按状态筛选' : 'Filter by Status'}
              </label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'cn' ? '所有状态' : 'All Statuses'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'cn' ? '所有状态' : 'All Statuses'}</SelectItem>
                  <SelectItem value="available">{language === 'cn' ? '可购买' : 'Available'}</SelectItem>
                  <SelectItem value="reserved">{language === 'cn' ? '已预订' : 'Reserved'}</SelectItem>
                  <SelectItem value="sold">{language === 'cn' ? '已售出' : 'Sold'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">
                {language === 'cn' ? '按风险等级筛选' : 'Filter by Risk Level'}
              </label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'cn' ? '所有风险等级' : 'All Risk Levels'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'cn' ? '所有风险等级' : 'All Risk Levels'}</SelectItem>
                  <SelectItem value="high">{language === 'cn' ? '高风险' : 'High Risk'}</SelectItem>
                  <SelectItem value="medium">{language === 'cn' ? '中等风险' : 'Medium Risk'}</SelectItem>
                  <SelectItem value="low">{language === 'cn' ? '低风险' : 'Low Risk'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">
                {language === 'cn' ? '按处置方式筛选' : 'Filter by Disposal Type'}
              </label>
              <Select value={disposalFilter} onValueChange={setDisposalFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'cn' ? '所有处置方式' : 'All Disposal Types'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'cn' ? '所有处置方式' : 'All Disposal Types'}</SelectItem>
                  <SelectItem value="auction">{language === 'cn' ? '竞拍' : 'Auction'}</SelectItem>
                  <SelectItem value="discount">{language === 'cn' ? '定向降价' : 'Discount'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">{language === 'cn' ? '全部产品' : 'All Products'}</TabsTrigger>
            <TabsTrigger value="auction">{language === 'cn' ? '竞拍产品' : 'Auction Products'}</TabsTrigger>
            <TabsTrigger value="discount">{language === 'cn' ? '折扣产品' : 'Discount Products'}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={language === 'cn' ? product.titleCn : product.titleEn} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">
                          {language === 'cn' ? '无图片' : 'No Image'}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 p-2">
                      <Badge className={`${getRiskBadgeColor(product.riskLevel)} text-white`}>
                        {language === 'cn' 
                          ? product.riskLevel === 'high' ? '高风险' : product.riskLevel === 'medium' ? '中风险' : '低风险'
                          : product.riskLevel === 'high' ? 'High Risk' : product.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'
                        }
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <Badge variant="outline" className="bg-white/80 text-black">
                        {language === 'cn' 
                          ? product.coalType === 'thermal' ? '动力煤' : product.coalType === 'coking' ? '焦煤' : '无烟煤'
                          : product.coalType.charAt(0).toUpperCase() + product.coalType.slice(1)
                        }
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        {language === 'cn' ? product.titleCn : product.titleEn}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={(e) => handleToggleFavorite(e, product.id)}
                      >
                        <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                      </Button>
                    </div>
                    <CardDescription className="text-sm mt-1">
                      {product.productCode} | {product.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === 'cn' ? '处置方式' : 'Disposal Type'}
                        </p>
                        <div className="flex items-center mt-1">
                          {product.disposalType === 'auction' ? (
                            <>
                              <Gavel className="h-4 w-4 text-blue-500 mr-1" />
                              <span className="font-medium">
                                {language === 'cn' ? '竞拍' : 'Auction'}
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                              <span className="font-medium">
                                {language === 'cn' ? '定向降价' : 'Discount'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {language === 'cn' ? '数量' : 'Quantity'}
                        </p>
                        <p className="font-medium mt-1">
                          {product.quantity} {language === 'cn' ? '吨' : 'tons'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 mb-1">
                        {language === 'cn' ? '质量指标' : 'Quality Indicators'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(product.quality).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {product.disposalType === 'auction' && product.auctionEndTime && (
                      <div className="flex items-center mb-3 text-orange-600">
                        <Timer className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {language === 'cn' ? '竞拍剩余时间: ' : 'Auction ends in: '}
                          {getTimeRemaining(product.auctionEndTime)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                  
                  <Separator />
                  
                  <CardFooter className="flex justify-between items-center py-4">
                    <div>
                      <p className="text-xs text-gray-500">
                        {language === 'cn' ? '原价' : 'Original Price'}
                      </p>
                      <p className="text-sm line-through text-gray-500">
                        {formatPrice(product.originalPrice)}
                        <span className="text-xs ml-1">/吨</span>
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(product.currentPrice)}
                        <span className="text-xs font-normal ml-1">/吨</span>
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {product.disposalType === 'auction' ? (
                        <Button size="sm" onClick={(e) => handleBid(e, product)}>
                          {language === 'cn' ? '参与竞拍' : 'Place Bid'}
                        </Button>
                      ) : (
                        <Button size="sm" onClick={(e) => handleBuyNow(e, product)}>
                          {language === 'cn' ? '立即购买' : 'Buy Now'}
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {displayProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'cn' ? '没有找到符合条件的产品' : 'No products found'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {language === 'cn' 
                    ? '请尝试调整筛选条件或稍后再查看' 
                    : 'Try adjusting your filters or check back later'}
                </p>
                <Button variant="outline" onClick={() => {
                  setFilter('all');
                  setRiskFilter('all');
                  setDisposalFilter('all');
                }}>
                  {language === 'cn' ? '清除筛选条件' : 'Clear Filters'}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="auction" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts
                .filter(product => product.disposalType === 'auction')
                .map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {/* Card contents from above, repeating for this tab */}
                    <div className="relative h-48 overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={language === 'cn' ? product.titleCn : product.titleEn} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-lg">
                            {language === 'cn' ? '无图片' : 'No Image'}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 p-2">
                        <Badge className={`${getRiskBadgeColor(product.riskLevel)} text-white`}>
                          {language === 'cn' 
                            ? product.riskLevel === 'high' ? '高风险' : product.riskLevel === 'medium' ? '中风险' : '低风险'
                            : product.riskLevel === 'high' ? 'High Risk' : product.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'
                          }
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">
                          {language === 'cn' ? product.titleCn : product.titleEn}
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={(e) => handleToggleFavorite(e, product.id)}
                        >
                          <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                        </Button>
                      </div>
                      <CardDescription className="text-sm mt-1">
                        {product.productCode} | {product.location}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {product.auctionEndTime && (
                        <div className="flex items-center mb-3 text-orange-600">
                          <Timer className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {language === 'cn' ? '竞拍剩余时间: ' : 'Auction ends in: '}
                            {getTimeRemaining(product.auctionEndTime)}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    
                    <Separator />
                    
                    <CardFooter className="flex justify-between items-center py-4">
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(product.currentPrice)}
                          <span className="text-xs font-normal ml-1">/吨</span>
                        </p>
                      </div>
                      
                      <Button size="sm" onClick={(e) => handleBid(e, product)}>
                        {language === 'cn' ? '参与竞拍' : 'Place Bid'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            
            {displayProducts.filter(product => product.disposalType === 'auction').length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Gavel className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'cn' ? '暂无竞拍产品' : 'No auction products available'}
                </h3>
                <p className="text-gray-500">
                  {language === 'cn' 
                    ? '目前没有可参与竞拍的产品，请稍后再查看' 
                    : 'There are currently no products available for auction. Please check back later.'}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="discount" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts
                .filter(product => product.disposalType === 'discount')
                .map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {/* Card contents for discount products */}
                    <div className="relative h-48 overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={language === 'cn' ? product.titleCn : product.titleEn} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-lg">
                            {language === 'cn' ? '无图片' : 'No Image'}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 p-2">
                        <Badge className={`${getRiskBadgeColor(product.riskLevel)} text-white`}>
                          {language === 'cn' 
                            ? product.riskLevel === 'high' ? '高风险' : product.riskLevel === 'medium' ? '中风险' : '低风险'
                            : product.riskLevel === 'high' ? 'High Risk' : product.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'
                          }
                        </Badge>
                      </div>
                      
                      <div className="absolute top-0 left-0 p-2">
                        <Badge className="bg-green-500 text-white">
                          {language === 'cn' ? '特惠价' : 'Special Price'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">
                          {language === 'cn' ? product.titleCn : product.titleEn}
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={(e) => handleToggleFavorite(e, product.id)}
                        >
                          <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                        </Button>
                      </div>
                      <CardDescription className="text-sm mt-1">
                        {product.productCode} | {product.location}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center mb-3">
                        <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">
                          {language === 'cn' 
                            ? `降价${Math.round((1 - product.currentPrice / product.originalPrice) * 100)}%` 
                            : `${Math.round((1 - product.currentPrice / product.originalPrice) * 100)}% Discount`
                          }
                        </span>
                      </div>
                    </CardContent>
                    
                    <Separator />
                    
                    <CardFooter className="flex justify-between items-center py-4">
                      <div>
                        <p className="text-xs text-gray-500">
                          {language === 'cn' ? '原价' : 'Original Price'}
                        </p>
                        <p className="text-sm line-through text-gray-500">
                          {formatPrice(product.originalPrice)}
                          <span className="text-xs ml-1">/吨</span>
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(product.currentPrice)}
                          <span className="text-xs font-normal ml-1">/吨</span>
                        </p>
                      </div>
                      
                      <Button size="sm" onClick={(e) => handleBuyNow(e, product)}>
                        {language === 'cn' ? '立即购买' : 'Buy Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            
            {displayProducts.filter(product => product.disposalType === 'discount').length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Tag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'cn' ? '暂无折扣产品' : 'No discount products available'}
                </h3>
                <p className="text-gray-500">
                  {language === 'cn' 
                    ? '目前没有特价折扣的煤炭产品，请稍后再查看' 
                    : 'There are currently no discounted coal products available. Please check back later.'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CoalRiskDisposal;