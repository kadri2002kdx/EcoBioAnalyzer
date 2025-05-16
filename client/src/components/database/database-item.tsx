import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DatabaseItemProps {
  item: any;
}

export default function DatabaseItem({ item }: DatabaseItemProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  
  // Determine item type and category
  let itemType = 'نبات';
  let categoryClass = 'bg-green-100 text-green-800';
  
  if (item.soilType) {
    itemType = 'تربة';
    categoryClass = 'bg-yellow-100 text-yellow-800';
  } else if (item.ecosystemId) {
    itemType = 'نظام بيئي';
    categoryClass = 'bg-blue-100 text-blue-800';
  } else if (item.category) {
    itemType = item.category;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300">
      <img 
        src={item.imageUrl} 
        className="w-full h-44 object-cover" 
        alt={item.name || item.plantName || item.soilType} 
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold">
            {item.name || item.plantName || item.soilType}
          </h4>
          <span className={`text-xs ${categoryClass} px-2 py-0.5 rounded-full`}>
            {itemType}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{t('database.item.region')}: {item.region}</span>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-primary hover:underline p-0 h-auto">
                {t('database.item.viewMore')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{item.name || item.plantName || item.soilType}</DialogTitle>
                <DialogDescription>{itemType} - {item.region}</DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <img 
                  src={item.imageUrl} 
                  className="w-full h-48 object-cover rounded-md mb-4" 
                  alt={item.name || item.plantName || item.soilType} 
                />
                
                {item.scientificName && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold">{t('database.details.scientificName')}:</h4>
                    <p className="text-sm">{item.scientificName}</p>
                  </div>
                )}
                
                <div className="mb-3">
                  <h4 className="text-sm font-semibold">{t('database.details.description')}:</h4>
                  <p className="text-sm">{item.description}</p>
                </div>
                
                {item.characteristics && (
                  <div>
                    <h4 className="text-sm font-semibold">{t('database.details.characteristics')}:</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(item.characteristics).map(([key, value]) => (
                        <div key={key} className="bg-gray-100 p-2 rounded">
                          <span className="text-xs font-medium">{key}: </span>
                          <span className="text-xs">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
