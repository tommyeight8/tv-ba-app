// "use client";

// import { createContext, useContext, useState, useTransition } from "react";
// import {
//   fetchHubSpotContactsPaginated,
//   searchContactsByCity,
//   searchContactsByCompany,
//   searchContactsByPostalCode,
// } from "@/app/actions/actions";
// import { HubSpotContact } from "@/types/hubspot";

// type SearchType = "company" | "postalCode" | "city";

// type SearchContextType = {
//   query: string;
//   setQuery: (val: string) => void;
//   isPending: boolean;
//   contacts: HubSpotContact[];
//   setContacts: React.Dispatch<React.SetStateAction<HubSpotContact[]>>;
//   searchType: SearchType;
//   setSearchType: (type: SearchType) => void;
//   runSearch: () => void;
//   isSearching: boolean;
//   setIsSearching: (val: boolean) => void;
//   loadInitialContacts: () => void;
//   after: string | null;
//   setAfter: (val: string | null) => void;
// };

// const SearchContext = createContext<SearchContextType | undefined>(undefined);

// export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
//   const [query, setQuery] = useState("");
//   const [contacts, setContacts] = useState<HubSpotContact[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [isPending, startTransition] = useTransition();
//   const [after, setAfter] = useState<string | null>(null);
//   const [searchType, setSearchType] = useState<SearchType>("company"); // ✅ Fix: move here

//   const runSearch = async () => {
//     if (query.length < 2) return;
//     setIsSearching(true);

//     startTransition(async () => {
//       let res;

//       switch (searchType) {
//         case "postalCode":
//           res = await searchContactsByPostalCode(query);
//           break;
//         case "city":
//           res = await searchContactsByCity(query);
//           break;
//         default:
//           res = await searchContactsByCompany(query);
//           break;
//       }

//       setContacts(res.results);
//       setAfter(res.paging ?? null);
//       setIsSearching(false); // ✅ reset
//     });
//   };

//   const loadInitialContacts = async () => {
//     startTransition(async () => {
//       const res = await fetchHubSpotContactsPaginated(12, "");
//       setContacts(res.results);
//       setAfter(res.paging ?? null);
//     });
//   };

//   return (
//     <SearchContext.Provider
//       value={{
//         query,
//         setQuery,
//         isPending,
//         contacts,
//         setContacts,
//         runSearch,
//         isSearching,
//         setIsSearching,
//         loadInitialContacts,
//         after,
//         setAfter,
//         searchType,
//         setSearchType,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearchContext = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error("useSearchContext must be used within a SearchProvider");
//   }
//   return context;
// };
