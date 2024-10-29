import React, { useState } from "react";
import { Mic, Filter, Upload, MessageSquare } from "lucide-react";
import { Switch } from "@headlessui/react";

import { SearchResults } from "./SearchResults";

interface Tag {
  id: string;
  text: string;
}

function Search() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [input, setInput] = useState("");
  const [isChatMode, setIsChatMode] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      setTags([...tags, { id: Date.now().toString(), text: input.trim() }]);
      setInput("");
    }
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-10 px-4">
      <div className="w-full max-w-3xl space-y-4">
        <div className="border b-t-none border-gray-200 rounded-xl">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
              <div className="flex flex-wrap gap-2 flex-1 min-h-12 items-center">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-sm"
                  >
                    {tag.text}
                    <button
                      onClick={() => removeTag(tag.id)}
                      className="ml-1.5 text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="flex-1 outline-none min-w-[200px] text-gray-800 placeholder-gray-400"
                  placeholder="有问题尽管问 Coco"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-3">
              <button className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" />问 Coco
              </button>
              <button className="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </button>
              <button className="inline-flex items-center px-2 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                上传
              </button>
            </div>

            {/* Switch */}
            <div className="flex items-center">
              <span className="mr-3 text-sm font-medium text-gray-700">
                Chat 模式
              </span>
              <Switch
                checked={isChatMode}
                onChange={setIsChatMode}
                className={`${
                  isChatMode ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    isChatMode ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* Search Results Panel */}
        <SearchResults />
      </div>
    </div>
  );
}

export default Search;
