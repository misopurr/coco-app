import React, { useState } from "react";

import { SearchHeader } from "./SearchHeader";
import { DocumentList } from "./DocumentList";
import { DocumentDetail } from "./DocumentDetail";

export const SearchResults: React.FC = () => {
  const [selectedDocumentId, setSelectedDocumentId] = useState("1"); // Default to first document

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">
      <div className="flex h-[calc(100vh-220px)]">
        {/* Left Panel */}
        <div className="w-[420px] border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 flex-shrink-0">
            <SearchHeader />
          </div>
          <div className="overflow-y-auto flex-1">
            <DocumentList
              onSelectDocument={setSelectedDocumentId}
              selectedId={selectedDocumentId}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 overflow-y-auto">
          <DocumentDetail documentId={selectedDocumentId} />
        </div>
      </div>
    </div>
  );
};
