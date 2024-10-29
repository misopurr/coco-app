import React, { useState, Fragment } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <Menu as="div" className="relative text-xs">
      <MenuButton className="inline-flex items-center px-3 py-1.5 text-sm bg-white text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 font-medium">
        {label}
        <ChevronDown className="w-4 h-4 ml-1.5 text-gray-500" />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 focus:outline-none">
        {options.map((option) => (
          <MenuItem key={option.id}>
            {({ active }) => (
              <button
                onClick={() => onChange(option.id)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-50" : ""
                } ${
                  value === option.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

const typeOptions: FilterOption[] = [
  { id: "all", label: "全部类型" },
  { id: "doc", label: "文档" },
  { id: "image", label: "图片" },
  { id: "code", label: "代码" },
];

const ownerOptions: FilterOption[] = [
  { id: "all", label: "全部归属" },
  { id: "personal", label: "个人" },
  { id: "team", label: "团队" },
  { id: "public", label: "公开" },
];

const creatorOptions: FilterOption[] = [
  { id: "all", label: "全部创建者" },
  { id: "me", label: "我创建的" },
  { id: "shared", label: "共享给我的" },
];

export const SearchHeader: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [creatorFilter, setCreatorFilter] = useState("all");

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 text-xs">
      <div className="text-gray-600">
        搜索到 <span className="font-medium text-gray-900">200</span> 条数据
      </div>
      <div className="flex gap-3">
        <FilterDropdown
          label="类型"
          options={typeOptions}
          value={typeFilter}
          onChange={setTypeFilter}
        />
        <FilterDropdown
          label="归属"
          options={ownerOptions}
          value={ownerFilter}
          onChange={setOwnerFilter}
        />
        <FilterDropdown
          label="创建者"
          options={creatorOptions}
          value={creatorFilter}
          onChange={setCreatorFilter}
        />
      </div>
    </div>
  );
};
