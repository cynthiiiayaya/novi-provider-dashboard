import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  Link2Icon,
  LogOutIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
  UtensilsIcon,
  XIcon,
  SlidersHorizontal,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

// Define data for sidebar navigation
const sidebarItems = [
  { icon: <UserIcon className="w-6 h-6" />, label: "Patients", active: true },
  {
    icon: <UtensilsIcon className="w-6 h-6" />,
    label: "Meal Review",
    active: false,
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    label: "Appointments",
    active: false,
  },
  {
    icon: <Link2Icon className="w-6 h-6" />,
    label: "Account Match",
    active: false,
  },
  {
    icon: <UsersIcon className="w-6 h-6" />,
    label: "Providers",
    active: false,
  },
];

// Define table headers
const tableHeaders = [
  { id: "status", label: "STATUS", width: "84px" },
  { id: "name", label: "NAME", width: "145px" },
  { id: "program", label: "PROGRAM", width: "114px" },
  { id: "provider", label: "PROVIDER", width: "92px" },
  { id: "patient", label: "PATIENT", width: "86px" },
  { id: "newLogs", label: "NEW LOGS", width: "103px" },
  { id: "reviewBy", label: "REVIEW BY", width: "99px" },
  { id: "lastReview", label: "LAST REVIEW", width: "115px" },
  { id: "nextAppt", label: "NEXT APPT.", width: "115px" },
  { id: "sensorSetup", label: "SENSOR SETUP", width: "128px" },
  { id: "glucose", label: "GLUCOSE", width: "125px" },
  { id: "weight", label: "WEIGHT", width: "83px" },
  { id: "bloodPressure", label: "MmHG", width: "67px" },
  { id: "note", label: "NOTE", width: "354px" },
];

// Define filter options
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Digital Support", label: "Digital Support" },
  { value: "Archived", label: "Archived" },
];

const logReviewStatusOptions = [
  { value: "Reviewed", label: "Reviewed" },
  { value: "Recently unreviewed", label: "Recently unreviewed" },
  { value: "Unreviewed over 3 days", label: "Unreviewed over 3 days" },
  { value: "Unreviewed over 1 week", label: "Unreviewed over 1 week" },
  { value: "Unreviewed over 2 weeks", label: "Unreviewed over 2 weeks" },
];

const messageOptions = [
  { value: "Internal message", label: "Internal message" },
  { value: "Patient message", label: "Patient message" },
];

// Sample program options (can be dynamically generated from actual data)
const programOptions = [
  { value: "Magnum", label: "Magnum" },
  { value: "Wellness", label: "Wellness" },
  { value: "Weight Loss", label: "Weight Loss" },
  { value: "Diabetes Care", label: "Diabetes Care" },
  { value: "Hypertension", label: "Hypertension" },
  { value: "Cholesterol", label: "Cholesterol" },
  { value: "Nutrition", label: "Nutrition" },
  { value: "Exercise", label: "Exercise" },
  { value: "Mental Health", label: "Mental Health" },
];

// Define patient data
const patientData = [
  {
    status: { label: "Active", color: "#239a84", bgColor: "#aee4de" },
    name: "Alice Chong Wei Xi...",
    email: "alicech0ng@outlook.com",
    program: "Magnum",
    programDetails: "Day 53/60, Rybelsus",
    provider: { count: 1, time: "11:24pm" },
    patient: { count: 1, status: "Draft", time: "11:24pm" },
    newLogs: { count: 1, time: "Today, 8:32pm" },
    reviewBy: "Mon, 27 May",
    lastReview: "12 days ago",
    nextAppt: "Today, Feb 27, 9:30 am",
    sensorSetup: { date: "12 days ago", active: "40%" },
    glucose: "Latest: 2.9 - 11.9",
    weight: "10%",
    bloodPressure: "118/72",
    note: "Notes (36 char max)",
    rowBg: "bg-white",
  },
  {
    status: { label: "Support", color: "#074a9a", bgColor: "#c4d4e7" },
    name: "Alice Chong Wei Xi...",
    email: "alicech0ng@outlook.com",
    program: "Magnum",
    programDetails: "Day 53/60, Rybelsus",
    provider: { count: 1, time: "11:24pm" },
    patient: { count: 1, status: "Draft", time: "11:24pm" },
    newLogs: { count: 1, time: "Today, 8:32pm" },
    reviewBy: "Mon, 27 May",
    lastReview: "12 days ago",
    nextAppt: "Today, Feb 27, 9:30 am",
    sensorSetup: { date: "12 days ago", active: "40%" },
    glucose: "Latest: 2.9 - 11.9",
    weight: "20%",
    bloodPressure: "118/72",
    note: "Notes (36 char max)",
    rowBg: "bg-[#f3f3f5]",
  },
  {
    status: { label: "Active", color: "#239a84", bgColor: "#aee4de" },
    name: "John Smith",
    email: "johnsmith@gmail.com",
    program: "Wellness",
    programDetails: "Day 12/30, Monitor",
    provider: { count: 2, time: "09:15am" },
    patient: { count: 3, status: "Submitted", time: "10:45am" },
    newLogs: { count: 5, time: "Yesterday, 2:15pm" },
    reviewBy: "Tue, 28 May",
    lastReview: "5 days ago",
    nextAppt: "Tomorrow, Feb 28, 11:00 am",
    sensorSetup: { date: "5 days ago", active: "75%" },
    glucose: "Latest: 3.2 - 9.8",
    weight: "5%",
    bloodPressure: "122/80",
    note: "Patient reported feeling better",
    rowBg: "bg-white",
  },
];

export const PatientList = (): JSX.Element => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patientData);
  
  // State for profile dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending' | 'none';
  }>({
    key: '',
    direction: 'none'
  });

  // State for filter modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const filterModalRef = useRef<HTMLDivElement>(null);
  
  // State for visible columns
  const [visibleColumns, setVisibleColumns] = useState<{[key: string]: boolean}>(
    tableHeaders.reduce((acc, header) => ({...acc, [header.id]: true}), {})
  );

  // State for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // State for filter settings
  const [filterSettings, setFilterSettings] = useState({
    status: [] as string[],
    program: [] as string[],
    messages: [] as string[],
    logReviewStatus: [] as string[],
    reviewByDate: '',
    lastReviewDate: '',
    sensorExpiryDate: ''
  });

  // State for program search
  const [programSearchTerm, setProgramSearchTerm] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  // Effect to handle clicks outside of modals
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (filterModalRef.current && !filterModalRef.current.contains(event.target as Node) && 
          !(event.target as HTMLElement).closest('#filter-button')) {
        setShowFilterModal(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search input changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterSettings, sortConfig]);

  // Apply all filters
  const applyFilters = () => {
    let results = [...patientData];
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterSettings.status.length > 0) {
      results = results.filter(patient => {
        // Map "Support" to "Digital Support" for filtering
        const statusLabel = patient.status.label === "Support" ? "Digital Support" : patient.status.label;
        return filterSettings.status.includes(statusLabel);
      });
    }
    
    // Apply program filter
    if (filterSettings.program.length > 0) {
      results = results.filter(patient => 
        filterSettings.program.includes(patient.program)
      );
    }
    
    // Apply sorting
    if (sortConfig.direction !== 'none') {
      results.sort((a, b) => {
        let aValue;
        let bValue;
        
        // Extract the values for sorting based on the column
        switch(sortConfig.key) {
          case 'status':
            aValue = a.status.label;
            bValue = b.status.label;
            break;
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'program':
            aValue = a.program;
            bValue = b.program;
            break;
          case 'provider':
            aValue = a.provider.count;
            bValue = b.provider.count;
            break;
          case 'patient':
            aValue = a.patient.count;
            bValue = b.patient.count;
            break;
          case 'newLogs':
            aValue = a.newLogs.count;
            bValue = b.newLogs.count;
            break;
          case 'reviewBy':
            aValue = a.reviewBy;
            bValue = b.reviewBy;
            break;
          case 'lastReview':
            aValue = a.lastReview;
            bValue = b.lastReview;
            break;
          case 'weight':
            aValue = parseInt(a.weight);
            bValue = parseInt(b.weight);
            break;
          case 'bloodPressure':
            aValue = a.bloodPressure;
            bValue = b.bloodPressure;
            break;
          default:
            aValue = a[sortConfig.key as keyof typeof a];
            bValue = b[sortConfig.key as keyof typeof b];
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredPatients(results);
  };

  // Handle search clear
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Handle column sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | 'none' = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'none';
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  // Reset column visibility
  const resetColumnVisibility = () => {
    setVisibleColumns(
      tableHeaders.reduce((acc, header) => ({...acc, [header.id]: true}), {})
    );
  };

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Update filter settings
  const updateFilterSetting = (key: keyof typeof filterSettings, value: any) => {
    setFilterSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    updateFilterSetting('status', 
      filterSettings.status.includes(status)
        ? filterSettings.status.filter(s => s !== status)
        : [...filterSettings.status, status]
    );
  };

  // Toggle log review status filter
  const toggleLogReviewStatusFilter = (status: string) => {
    updateFilterSetting('logReviewStatus', 
      filterSettings.logReviewStatus.includes(status)
        ? filterSettings.logReviewStatus.filter(s => s !== status)
        : [...filterSettings.logReviewStatus, status]
    );
  };

  // Toggle message filter
  const toggleMessageFilter = (message: string) => {
    updateFilterSetting('messages', 
      filterSettings.messages.includes(message)
        ? filterSettings.messages.filter(m => m !== message)
        : [...filterSettings.messages, message]
    );
  };

  // Handle program selection
  const handleProgramSelection = (program: string) => {
    const newSelection = selectedPrograms.includes(program)
      ? selectedPrograms.filter(p => p !== program)
      : [...selectedPrograms, program];
    
    setSelectedPrograms(newSelection);
    setSelectAll(newSelection.length === programOptions.length);
    updateFilterSetting('program', newSelection);
  };

  // Handle select all programs
  const handleSelectAllPrograms = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      const allPrograms = programOptions.map(p => p.value);
      setSelectedPrograms(allPrograms);
      updateFilterSetting('program', allPrograms);
    } else {
      setSelectedPrograms([]);
      updateFilterSetting('program', []);
    }
  };

  // Filter program options based on search
  const filteredProgramOptions = programOptions.filter(option => 
    option.label.toLowerCase().includes(programSearchTerm.toLowerCase())
  );

  // Get sort icon for column headers
  const getSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <ArrowUpIcon className="w-4 h-4 text-[#161635]" />;
      } else if (sortConfig.direction === 'descending') {
        return <ArrowDownIcon className="w-4 h-4 text-[#161635]" />;
      }
    }
    return <ArrowUpDownIcon className="w-4 h-4 text-[#6f6f82]" />;
  };

  // Filter visible table headers
  const visibleTableHeaders = tableHeaders.filter(header => visibleColumns[header.id]);

  // Tooltip component
  const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    
    return (
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
        {showTooltip && sidebarCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded z-50 whitespace-nowrap">
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-start gap-px relative bg-surfacesurfaceelevation-0">
      {/* Sidebar */}
      <aside className={`relative self-stretch ${sidebarCollapsed ? 'w-16' : 'w-[186px]'} bg-neutralsneutrals-101 transition-all duration-300`}>
        <div className="relative h-[963px] top-5 flex flex-col items-center">
          {/* Collapse Button */}
          <div className="w-full flex justify-end px-4 mb-4">
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              {sidebarCollapsed ? 
                <ChevronRightIcon className="w-5 h-5 text-[#6f6f82]" /> : 
                <ChevronLeftIcon className="w-5 h-5 text-[#6f6f82]" />
              }
            </button>
          </div>

          {/* Logo */}
          {!sidebarCollapsed && (
            <div className="flex flex-col w-full h-[53.12px] items-center gap-1.5 relative mb-6">
              <img
                className="relative w-[89px] h-[34.03px]"
                alt="Logo"
                src="public/logo.svg"
              />
              <div className="relative self-stretch mb-[-0.91px] [font-family:'Inter',Helvetica] font-medium text-[#6f6f82] text-xs text-center tracking-[4.00px] leading-[normal]">
                PROVIDER
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="inline-flex flex-col items-center w-full gap-3 relative flex-[0_0_auto]">
            {sidebarItems.map((item, index) => (
              <Tooltip key={index} text={item.label}>
                <div
                  className={`inline-flex items-center justify-center relative w-full cursor-pointer
                    ${item.active ? "bg-[#161635]" : ""} hover:bg-[#1a1a3a] transition-colors`}
                >
                  <div
                    className={`flex items-center gap-3 py-3 
                      ${sidebarCollapsed ? 'px-0 w-full justify-center' : 'px-6 w-[186px]'}`}
                  >
                    <div className={`w-6 h-6 ${item.active ? "text-[#f3f3f5]" : "text-[#6f6f82]"}`}>
                      {item.icon}
                    </div>
                    {!sidebarCollapsed && (
                      <div
                        className={`relative w-fit font-body-paragraph2 font-[number:var(--body-paragraph2-font-weight)] 
                          text-[length:var(--body-paragraph2-font-size)] text-center tracking-[var(--body-paragraph2-letter-spacing)] 
                          leading-[var(--body-paragraph2-line-height)] whitespace-nowrap [font-style:var(--body-paragraph2-font-style)] 
                          ${item.active ? "text-[#f3f3f5]" : "text-[#6f6f82]"}`}
                      >
                        {item.label}
                      </div>
                    )}
                  </div>
                </div>
              </Tooltip>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto mb-6 w-full">
            <Tooltip text="Log out">
              <div className="flex items-center justify-center w-full hover:bg-[#1a1a3a] cursor-pointer transition-colors">
                <div className={`flex items-center gap-3 py-3 ${sidebarCollapsed ? 'px-0 w-full justify-center' : 'px-6 w-[186px]'}`}>
                  <LogOutIcon className="w-6 h-6 text-[#6f6f82]" />
                  {!sidebarCollapsed && (
                    <div className="text-[#6f6f82] relative w-fit font-body-paragraph2 font-[number:var(--body-paragraph2-font-weight)] text-[length:var(--body-paragraph2-font-size)] text-center tracking-[var(--body-paragraph2-letter-spacing)] leading-[var(--body-paragraph2-line-height)] whitespace-nowrap [font-style:var(--body-paragraph2-font-style)]">
                      Log out
                    </div>
                  )}
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col items-start relative flex-1 grow bg-transparent">
        {/* Header */}
        <header className="flex flex-col h-[72px] items-start justify-center px-6 py-4 relative self-stretch w-full bg-white">
          <div className="flex items-center justify-between relative self-stretch w-full">
            {/* Patient Stats */}
            <div className="relative w-[230px] h-[18px]">
              <div className="absolute -top-px left-0 font-body-caption2 font-[number:var(--body-caption2-font-weight)] text-neutralsneutrals-501 text-[length:var(--body-caption2-font-size)] tracking-[var(--body-caption2-letter-spacing)] leading-[var(--body-caption2-line-height)] whitespace-nowrap [font-style:var(--body-caption2-font-style)]">
                422 active, 3 pending, 75 digital support
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex w-[463px] h-9 items-center justify-between px-4 py-2 relative bg-[#f3f3f5] rounded-[40px]">
              <div className="flex items-center gap-2 flex-grow">
                <SearchIcon className="w-6 h-6 text-[#a7a7b3]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name"
                  className="bg-transparent outline-none border-none w-full font-body-paragraph1 font-[number:var(--body-paragraph1-font-weight)] text-[#161635] text-[length:var(--body-paragraph1-font-size)] tracking-[var(--body-paragraph1-letter-spacing)] leading-[var(--body-paragraph1-line-height)] [font-style:var(--body-paragraph1-font-style)]"
                />
              </div>
              {searchTerm && (
                <XIcon 
                  className="w-6 h-6 text-[#a7a7b3] cursor-pointer" 
                  onClick={clearSearch}
                />
              )}
            </div>

            {/* User Profile */}
            <div className="flex w-[230px] items-center justify-end gap-5 relative">
              <div className="relative w-6 h-6 cursor-pointer">
                <div className="relative h-6">
                  <img
                    className="absolute w-[18px] h-5 top-0.5 left-[3px]"
                    alt="Notification"
                    src="public/group-147.png"
                  />
                </div>
              </div>
              <div className="items-start inline-flex relative flex-[0_0_auto]" ref={profileDropdownRef}>
                <Button
                  variant="outline"
                  className="h-8 px-2 rounded-[26px] border border-[#c7c7cf] hover:bg-gray-100"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <span className="font-paragraph-caption-1-strong font-[number:var(--paragraph-caption-1-strong-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-strong-font-size)] text-center tracking-[var(--paragraph-caption-1-strong-letter-spacing)] leading-[var(--paragraph-caption-1-strong-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-strong-font-style)]">
                    Elizabeth
                  </span>
                </Button>
                
                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Elizabeth Taylor</p>
                      <p className="text-xs text-gray-500 mt-1">elizabeth.taylor@example.com</p>
                    </div>
                    <div className="py-1">
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          alert("Logging out...");
                        }}
                      >
                        <LogOutIcon className="w-4 h-4 mr-2" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Filter Button Row */}
        <div className="flex items-center px-6 py-3 w-full bg-white border-t border-[#f3f3f5]">
          <Button
            id="filter-button"
            variant="outline"
            className="flex items-center gap-2 px-3 py-2 border border-[#e5e5ea] rounded-md hover:bg-gray-50"
            onClick={() => setShowFilterModal(!showFilterModal)}
          >
            <span className="text-sm font-medium text-[#161635]">All Filters</span>
            <SlidersHorizontal className="w-4 h-4 text-[#161635]" />
          </Button>

          {/* Filter Modal */}
          {showFilterModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div 
                ref={filterModalRef}
                className="w-[600px] max-h-[90vh] bg-white rounded-md shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">All Filters</h3>
                  <button 
                    onClick={() => setShowFilterModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {/* Status Filter */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-3">Status</h4>
                    <div className="flex flex-wrap gap-3">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`px-6 py-3 rounded-full border ${
                            filterSettings.status.includes(option.value)
                              ? "bg-[#161635] text-white border-[#161635]"
                              : "bg-white text-[#161635] border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => toggleStatusFilter(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Program Name Filter */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-3">Program Name</h4>
                    <div className="relative mb-3">
                      <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={programSearchTerm}
                        onChange={(e) => setProgramSearchTerm(e.target.value)}
                        placeholder="Search program name"
                        className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-md border-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllPrograms}
                          className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Select all</span>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {filteredProgramOptions.map((program) => (
                        <label key={program.value} className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPrograms.includes(program.value)}
                            onChange={() => handleProgramSelection(program.value)}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{program.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Messages Filter */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-3">Messages</h4>
                    <div className="flex flex-wrap gap-3">
                      {messageOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`px-6 py-3 rounded-full border ${
                            filterSettings.messages.includes(option.value)
                              ? "bg-[#161635] text-white border-[#161635]"
                              : "bg-white text-[#161635] border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => toggleMessageFilter(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Log Review Status Filter */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-3">Log Review Status</h4>
                    <div className="flex flex-wrap gap-3">
                      {logReviewStatusOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`px-6 py-3 rounded-full border ${
                            filterSettings.logReviewStatus.includes(option.value)
                              ? "bg-[#161635] text-white border-[#161635]"
                              : "bg-white text-[#161635] border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => toggleLogReviewStatusFilter(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Filters */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">Review by</h4>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Select date"
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={filterSettings.reviewByDate}
                          onChange={(e) => updateFilterSetting('reviewByDate', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-3">Last Review</h4>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Select date"
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={filterSettings.lastReviewDate}
                          onChange={(e) => updateFilterSetting('lastReviewDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Sensor Expiry Date */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-3">Sensor Expiry Date</h4>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Select date"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        value={filterSettings.sensorExpiryDate}
                        onChange={(e) => updateFilterSetting('sensorExpiryDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="flex flex-col items-start pl-0 pr-5 py-0 relative self-stretch w-full flex-[0_0_auto] overflow-hidden">
          {/* Table Headers */}
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-[33px]">
                  {visibleTableHeaders.map((header, index) => (
                    <TableHead
                      key={index}
                      className="p-1 h-[33px] cursor-pointer hover:bg-gray-50"
                      style={{ width: header.width }}
                      onClick={() => requestSort(header.id)}
                    >
                      <div className="inline-flex items-center gap-1">
                        <span className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#6f6f82] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                          {header.label}
                        </span>
                        {getSortIcon(header.id)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={visibleTableHeaders.length} className="text-center py-8 text-gray-500">
                      No patients found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <TableRow key={index} className={`h-[52px] ${patient.rowBg} hover:bg-gray-50`}>
                      {/* Status */}
                      {visibleColumns.status && (
                        <TableCell className="pl-2.5 pr-3 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <Badge
                            className="px-2 py-1 rounded-[100px]"
                            style={{
                              backgroundColor: patient.status.bgColor,
                              color: patient.status.color,
                            }}
                          >
                            {patient.status.label}
                          </Badge>
                        </TableCell>
                      )}

                      {/* Name */}
                      {visibleColumns.name && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex flex-col w-[129px] items-start justify-center">
                            <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                              {patient.name}
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#a7a7b3] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              {patient.email}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Program */}
                      {visibleColumns.program && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex w-[129px] mr-[-29.00px] flex-col items-start justify-center">
                            <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                              {patient.program}
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#a7a7b3] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              {patient.programDetails}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Provider */}
                      {visibleColumns.provider && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex flex-col items-start justify-center">
                            <div className="inline-flex items-center gap-1">
                              <div className="relative w-5 h-5 bg-[url(public/icon-2.svg)] bg-[100%_100%]" />
                              <div className="font-paragraph-body-2 font-[number:var(--paragraph-body-2-font-weight)] text-[#161635] text-[length:var(--paragraph-body-2-font-size)] tracking-[var(--paragraph-body-2-letter-spacing)] leading-[var(--paragraph-body-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-body-2-font-style)]">
                                {patient.provider.count}
                              </div>
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#a7a7b3] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              {patient.provider.time}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Patient */}
                      {visibleColumns.patient && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex flex-col items-start justify-center">
                            <div className="inline-flex items-center gap-1">
                              <div className="relative w-5 h-5 bg-[url(public/icon-2.svg)] bg-[100%_100%]" />
                              <div className="font-paragraph-body-2 font-[number:var(--paragraph-body-2-font-weight)] text-[#161635] text-[length:var(--paragraph-body-2-font-size)] tracking-[var(--paragraph-body-2-letter-spacing)] leading-[var(--paragraph-body-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-body-2-font-style)]">
                                {patient.patient.count}
                              </div>
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              <span className="text-[#6f6f82]">
                                {patient.patient.status}
                              </span>
                              <span className="text-[#a7a7b3]">
                                , {patient.patient.time}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* New Logs */}
                      {visibleColumns.newLogs && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex flex-col items-start justify-center">
                            <div className="inline-flex items-center gap-1">
                              <div className="relative w-5 h-5">
                                <div className="relative w-4 h-[18px] left-1">
                                  <div className="absolute w-[13px] h-4 top-0.5 left-0 bg-[url(public/union.svg)] bg-[100%_100%]" />
                                  <div className="absolute w-[7px] h-[7px] top-0 left-2.5 bg-[#e27874] rounded-[3.33px]" />
                                </div>
                              </div>
                              <div className="font-paragraph-body-2 font-[number:var(--paragraph-body-2-font-weight)] text-[#161635] text-[length:var(--paragraph-body-2-font-size)] tracking-[var(--paragraph-body-2-letter-spacing)] leading-[var(--paragraph-body-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-body-2-font-style)]">
                                {patient.newLogs.count}
                              </div>
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#a7a7b3] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              {patient.newLogs.time}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Review By */}
                      {visibleColumns.reviewBy && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex gap-0.5 flex-col items-start justify-center">
                            <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] [font-style:var(--paragraph-caption-1-font-style)]">
                              {patient.reviewBy}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Last Review */}
                      {visibleColumns.lastReview && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex gap-0.5 flex-col items-start justify-center">
                            <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] [font-style:var(--paragraph-caption-1-font-style)]">
                              {patient.lastReview}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Next Appointment */}
                      {visibleColumns.nextAppt && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex w-[129px] gap-0.5 mr-[-28.00px] flex-col items-start justify-center">
                            <div className="w-[82px] font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] [font-style:var(--paragraph-caption-2-font-style)]">
                              {patient.nextAppt}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Sensor Setup */}
                      {visibleColumns.sensorSetup && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex w-[129px] mr-[-15.00px] flex-col items-start justify-center">
                            <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                              {patient.sensorSetup.date}
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#a7a7b3] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              Active: {patient.sensorSetup.active}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Glucose */}
                      {visibleColumns.glucose && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex flex-col items-start justify-center gap-1.5">
                            <div className="relative w-[100px] h-1">
                              <div className="w-2.5 left-0 bg-primaryimpacthigh-03 absolute h-1 top-0" />
                              <div className="w-2.5 left-[90px] bg-primaryimpactmoderate-03 absolute h-1 top-0" />
                              <div className="w-5 left-2.5 bg-primaryimpacthigh-01 absolute h-1 top-0" />
                              <div className="w-5 left-[70px] bg-primaryimpactmoderate-01 absolute h-1 top-0" />
                              <div className="w-10 left-[30px] bg-primaryimpactlow-03 absolute h-1 top-0" />
                            </div>
                            <div className="font-paragraph-caption-2 font-[number:var(--paragraph-caption-2-font-weight)] text-[#a7a7b3] text-[length:var(--paragraph-caption-2-font-size)] tracking-[var(--paragraph-caption-2-letter-spacing)] leading-[var(--paragraph-caption-2-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-2-font-style)]">
                              {patient.glucose}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Weight */}
                      {visibleColumns.weight && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex flex-col items-start justify-center">
                            <div className="inline-flex items-center gap-1">
                              <div
                                className={`relative w-5 h-5 ${index === 0 ? "bg-[url(public/icon-18.svg)]" : "bg-[url(public/icon.svg)]"} bg-[100%_100%]`}
                              />
                              <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                                {patient.weight}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Blood Pressure */}
                      {visibleColumns.bloodPressure && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex gap-0.5 flex-col items-start justify-center">
                            <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                              {patient.bloodPressure}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      {/* Note */}
                      {visibleColumns.note && (
                        <TableCell className="pl-2.5 pr-1 py-2 border-r-[0.5px] border-[#c7c7cf]">
                          <div className="flex gap-0.5 flex-col items-start justify-center">
                            <div className="inline-flex items-center gap-2">
                              <div className="font-paragraph-caption-1 font-[number:var(--paragraph-caption-1-font-weight)] text-[#161635] text-[length:var(--paragraph-caption-1-font-size)] tracking-[var(--paragraph-caption-1-letter-spacing)] leading-[var(--paragraph-caption-1-line-height)] whitespace-nowrap [font-style:var(--paragraph-caption-1-font-style)]">
                                {patient.note}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};