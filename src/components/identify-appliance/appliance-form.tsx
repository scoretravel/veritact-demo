import { BarcodeScanIcon, Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';

const applianceTypes = ['Dishwasher', 'Washing Machine', 'Dryer', 'Refrigerator', 'Oven'];
const brands = ['Bosch', 'Samsung', 'LG', 'Whirlpool', 'Miele', 'GE'];

/** Right-side dark card with appliance identification form fields. */
export const ApplianceForm = function () {
  return (
    <Card className="h-full rounded-none border-0 bg-[oklch(0.1_0.01_240)] ring-0 shadow-none">
      <CardHeader className="gap-2">
        <CardTitle className="text-lg font-bold tracking-wide text-white">
          Identify Appliance
        </CardTitle>
        <CardDescription className="text-white/40 text-sm">
          Confirm or adjust the detected appliance details below.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Appliance Type */}
        <div className="space-y-2">
          <Label className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Appliance Type
          </Label>
          <Combobox defaultValue="Dishwasher">
            <ComboboxTrigger className="border-input dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-1.5 rounded-md border bg-transparent px-2.5 py-2 text-sm shadow-xs">
              <ComboboxValue placeholder="Select type..." />
            </ComboboxTrigger>
            <ComboboxContent className="min-w-(--anchor-width) *:data-[slot=input-group]:mb-2">
              <ComboboxInput showTrigger={false} placeholder="Search types..." />
              <ComboboxList>
                {applianceTypes.map(function (type) {
                  return (
                    <ComboboxItem key={type} value={type}>
                      {type}
                    </ComboboxItem>
                  );
                })}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <Label className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Brand
          </Label>
          <Combobox defaultValue="Bosch">
            <ComboboxTrigger className="border-input dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-1.5 rounded-md border bg-transparent px-2.5 py-2 text-sm shadow-xs">
              <ComboboxValue placeholder="Select brand..." />
            </ComboboxTrigger>
            <ComboboxContent className="min-w-(--anchor-width) *:data-[slot=input-group]:mb-2">
              <ComboboxInput showTrigger={false} placeholder="Search brands..." />
              <ComboboxList>
                {brands.map(function (brand) {
                  return (
                    <ComboboxItem key={brand} value={brand}>
                      {brand}
                    </ComboboxItem>
                  );
                })}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        {/* Model Series / Number */}
        <div className="space-y-2">
          <Label className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            Model Series / Number
          </Label>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2} />
            </InputGroupAddon>
            <InputGroupInput placeholder="e.g. SHPM88Z75N" />
          </InputGroup>
          <p className="font-mono text-[10px] text-white/30">
            Found on the rating plate or door edge
          </p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2.5">
          <Checkbox id="discontinued" />
          <Label
            htmlFor="discontinued"
            className="text-sm text-white/60 font-normal cursor-pointer">
            Include discontinued models
          </Label>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Button
            className="h-11 w-full gap-2 rounded-lg text-sm font-bold cursor-pointer"
            style={{
              boxShadow: '0 0 15px oklch(0.7 0.15 200 / 30%), 0 0 30px oklch(0.7 0.15 200 / 10%)',
            }}>
            Confirm Model
            <span className="text-primary-foreground/70">&rarr;</span>
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full gap-2 rounded-lg text-sm font-medium cursor-pointer">
            <HugeiconsIcon icon={BarcodeScanIcon} size={16} strokeWidth={2} />
            Scan Barcode Instead
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
