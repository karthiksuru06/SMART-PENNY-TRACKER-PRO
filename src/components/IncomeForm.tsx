
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X, Check } from 'lucide-react';
import { Income, IncomeSource, incomeSourceIcons } from '@/types/expense';

interface IncomeFormProps {
  onSubmit: (income: Omit<Income, 'id'>) => void;
  onCancel: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onSubmit, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState<IncomeSource>('other');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) {
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      source,
      description,
      date: new Date(date),
    });

    // Reset form
    setAmount('');
    setSource('other');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="amount">Amount (₹)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <Label htmlFor="source">Income Source</Label>
        <Select value={source} onValueChange={(value: IncomeSource) => setSource(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(incomeSourceIcons).map(([key, icon]) => (
              <SelectItem key={key} value={key}>
                <span className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span className="capitalize">
                    {key === 'pocket-money' ? 'Pocket Money' : key}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Source of income..."
          required
        />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
          <Check className="h-4 w-4 mr-2" />
          Add Income
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default IncomeForm;
