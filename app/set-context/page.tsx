"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Filter,
  Play,
  X,
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: "B08PP5MSVB",
    name: "Black Water Bottle",
    description: "Sustainable and Eco-Friendly Water Bottle for Everyday Use | 1 Litre | Plastic - Black",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
  },
  {
    id: "D34R6T9Y88",
    name: "Silver Travel Mug",
    description: "Insulated Stainless Steel Travel Mug | 500 ml | Keeps Drinks Hot or Cold - Silver",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
  },
  {
    id: "E56Y7U1123",
    name: "Green Portable Blender",
    description: "Portable Blender for Smoothies | USB Rechargeable | Compact Design - Green",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop",
  },
  {
    id: "H12J4K5L89",
    name: "Gold Straw Set",
    description: "Stainless Steel Straw Set with Cleaning Brush | Eco-Friendly | Reusable - Gold",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
  },
  {
    id: "G90H3W4K12",
    name: "Red Collapsible Bottle",
    description: "Collapsible Silicone Water Bottle | Space-Saving | 750 ml - Red",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
  },
  {
    id: "I34L5M6N01",
    name: "Purple Yoga Mat",
    description: "Personalized Yoga Mat | Non-Slip | Extra Thick for Comfort - Purple",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
  },
  {
    id: "F78T9V2J67",
    name: "Blue Water Bottle",
    description: "Sustainable and Eco-Friendly Water Bottle for Everyday Use | 1 Litre | Plastic - Blue",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
  },
  {
    id: "C12QW8ER45",
    name: "Black Water Bottle M",
    description: "Sustainable and Eco-Friendly Water Bottle for Everyday Use | 1 Litre | Plastic - Black",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
  },
];

// Generate more products to reach 1002
const generateProducts = (): Product[] => {
  const baseProducts = [...products];
  const additionalProducts: Product[] = [];
  
  for (let i = 0; i < 994; i++) {
    const baseProduct = baseProducts[i % baseProducts.length];
    additionalProducts.push({
      ...baseProduct,
      id: `${baseProduct.id}-${i}`,
      name: `${baseProduct.name} ${i + 1}`,
    });
  }
  
  return [...baseProducts, ...additionalProducts];
};

const allProducts = generateProducts();

export default function SetContextPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<Array<{ metric: string; value: string }>>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleAddCriteria = () => {
    if (selectedMetric && selectedValue) {
      setActiveFilters([...activeFilters, { metric: selectedMetric, value: selectedValue }]);
      setSelectedMetric("");
      setSelectedValue("");
      setIsDialogOpen(false);
      
      // Filter products based on criteria
      if (selectedMetric === "Sales" && selectedValue === "Zero") {
        setFilteredProducts(allProducts.slice(0, 5));
      } else {
        setFilteredProducts(allProducts);
      }
    }
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = activeFilters.filter((_, i) => i !== index);
    setActiveFilters(newFilters);
    
    if (newFilters.length === 0) {
      setFilteredProducts(allProducts);
    }
  };

  const handleReset = () => {
    setActiveFilters([]);
    setFilteredProducts(allProducts);
    setSearchQuery("");
    setSelectedProducts(new Set());
    setSelectAll(false);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleProductSelect = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
    setSelectAll(newSelected.size === filteredProducts.length);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      if (activeFilters.length > 0 && activeFilters[0].metric === "Sales" && activeFilters[0].value === "Zero") {
        setFilteredProducts(allProducts.slice(0, 5));
      } else {
        setFilteredProducts(allProducts);
      }
    } else {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/run-workflow">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-[#1a1a1a] p-0 h-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Set Context
            </Button>
          </Link>
          <Button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border border-[#2a2a2a]">
            <Play className="w-4 h-4 mr-2" />
            Run Workflow
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search Product Listings"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 h-12 rounded-lg"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#1a1a1a] border-[#2a2a2a] text-white hover:bg-[#2a2a2a]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Set Criteria
          </Button>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-white hover:bg-[#1a1a1a]"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Product Count and Select All */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-gray-400">Showing {filteredProducts.length} products</span>
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label htmlFor="select-all" className="text-sm text-gray-400 cursor-pointer">
              Select all
            </label>
          </div>
          {activeFilters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-[#1a1a1a] border border-[#2a2a2a] text-white px-3 py-1"
            >
              {filter.metric} is {filter.value}
              <button
                onClick={() => handleRemoveFilter(index)}
                className="ml-2 hover:text-gray-400"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <div className="relative aspect-square bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Checkbox
                    checked={selectedProducts.has(product.id)}
                    onCheckedChange={(checked) => handleProductSelect(product.id, checked as boolean)}
                    className="border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                </div>
              </div>
              <div className="p-4 bg-[#0a0a0a]">
                <p className="text-xs text-gray-400 mb-1.5 font-mono">{product.id}</p>
                <p className="text-sm text-white leading-relaxed line-clamp-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Set Criteria Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DialogHeader>
              <DialogTitle>Set Criteria</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-4 py-4">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[200px] bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Conversion Rates">Conversion Rates</SelectItem>
                  <SelectItem value="Ad Clicks">Ad Clicks</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-gray-400">is</span>
              <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger className="w-[200px] bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select Value" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="Zero">Is Zero</SelectItem>
                  <SelectItem value="Bottom 5%">Bottom 5%</SelectItem>
                  <SelectItem value="Bottom 10%">Bottom 10%</SelectItem>
                  <SelectItem value="Bottom 20%">Bottom 20%</SelectItem>
                  <SelectItem value="Top 5%">Top 5%</SelectItem>
                  <SelectItem value="Top 10%">Top 10%</SelectItem>
                  <SelectItem value="Top 20%">Top 20%</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddCriteria}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Criteria
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

