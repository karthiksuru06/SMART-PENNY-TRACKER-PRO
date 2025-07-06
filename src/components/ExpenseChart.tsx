import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import {
  ExpenseCategory,
  categoryColors,
  categoryIcons,
} from '@/types/expense';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

interface ExpenseChartProps {
  categoryTotals: Record<ExpenseCategory, number>;
}

// ✅ Strongly typed Custom Tooltip
const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as {
      name: string;
      value: number;
      color: string;
      icon: string;
    };

    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium flex items-center gap-2">
          <span>{data.icon}</span>
          {data.name}
        </p>
        <p className="text-lg font-bold text-gray-900">
          ₹{data.value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ categoryTotals }) => {
  const data = Object.entries(categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount,
      color: categoryColors[category as ExpenseCategory],
      icon: categoryIcons[category as ExpenseCategory],
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No expenses to display
          </p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
