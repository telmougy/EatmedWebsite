import { useLocale } from 'next-intl';
import { cn } from '@/lib/cn';

type Node = {
  ar: string;
  en: string;
  children?: Node[];
};

const tree: Node = {
  ar: 'مجلس الإدارة',
  en: 'Board of Directors',
  children: [
    {
      ar: 'المدير العام',
      en: 'General Manager',
      children: [
        {
          ar: 'الإدارة الفنية',
          en: 'Technical',
          children: [
            { ar: 'قسم التركيب', en: 'Installations' },
            { ar: 'قسم الإنتاج', en: 'Production' },
          ],
        },
        {
          ar: 'المبيعات والتسويق',
          en: 'Sales & Marketing',
          children: [
            { ar: 'التسويق', en: 'Marketing' },
            { ar: 'المبيعات', en: 'Sales' },
          ],
        },
        {
          ar: 'الشؤون المالية والإدارية',
          en: 'Finance & Admin',
          children: [
            { ar: 'المشتريات', en: 'Procurement' },
            { ar: 'الحسابات', en: 'Accounts' },
            { ar: 'الموارد البشرية', en: 'HR' },
          ],
        },
      ],
    },
  ],
};

function Box({
  node,
  tone = 'default',
}: {
  node: Node;
  tone?: 'default' | 'primary' | 'navy';
}) {
  const locale = useLocale() as 'ar' | 'en';
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-center text-sm font-semibold shadow-sm',
        tone === 'navy' && 'bg-brand-navy border-transparent text-white',
        tone === 'primary' && 'bg-primary/10 text-primary border-primary/20',
        tone === 'default' && 'bg-card',
      )}
    >
      {node[locale]}
    </div>
  );
}

export function OrgChart() {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="mx-auto flex min-w-[760px] flex-col items-center gap-6">
        {/* Level 0 */}
        <Box node={tree} tone="navy" />
        <Connector />

        {/* Level 1 */}
        {tree.children?.map((gm) => (
          <div key={gm.en} className="flex flex-col items-center gap-6">
            <Box node={gm} tone="navy" />
            <Connector />
            {/* Level 2 */}
            <div className="grid w-full grid-cols-3 gap-6">
              {gm.children?.map((dept) => (
                <div key={dept.en} className="flex flex-col items-center gap-3">
                  <Box node={dept} tone="primary" />
                  <div className="bg-border h-6 w-px" />
                  <div className="flex flex-col gap-2">
                    {dept.children?.map((sub) => <Box key={sub.en} node={sub} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return <div className="bg-border h-6 w-px" />;
}
