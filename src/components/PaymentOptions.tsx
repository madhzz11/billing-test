
import React from 'react';
import { CreditCard, Smartphone, Clock, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PaymentOptionsProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedOption,
  onSelectOption
}) => {
  const paymentOptions: PaymentOption[] = [
    { id: 'cash', name: 'Cash', icon: <CircleDollarSign className="text-green-600" size={18} /> },
    { id: 'card', name: 'Card', icon: <CreditCard className="text-purple-600" size={18} /> },
    { id: 'due', name: 'Due', icon: <Clock className="text-amber-600" size={18} /> },
    { id: 'other', name: 'Other', icon: <Smartphone className="text-blue-600" size={18} /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {paymentOptions.map((option, index) => (
        <div
          key={option.id}
          className={cn(
            "payment-option border content-appear",
            selectedOption === option.id && "payment-option-active"
          )}
          style={{ '--delay': index + 2 } as React.CSSProperties}
          onClick={() => onSelectOption(option.id)}
        >
          {option.icon}
          <span>{option.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PaymentOptions;
