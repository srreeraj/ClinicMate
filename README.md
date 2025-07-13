<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ClinicMate Calendar</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .dark-mode {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        
        .calendar-card {
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .dark-mode .calendar-card {
            background: #2d2d2d;
            border-color: #404040;
        }

        .calendar-day {
            height: 100px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
        }

        .dark-mode .calendar-day {
            border-color: #404040;
        }

        .calendar-day:hover:not(.past-date) {
            background-color: #f3f4f6;
            cursor: pointer;
        }

        .dark-mode .calendar-day:hover:not(.past-date) {
            background-color: #404040;
        }

        .past-date {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .today {
            background-color: #e3f2fd;
            border-color: #90caf9;
        }

        .dark-mode .today {
            background-color: #1e3a5f;
            border-color: #2196f3;
        }

        .selected {
            background-color: #bbdefb;
            border-color: #64b5f6;
        }

        .dark-mode .selected {
            background-color: #0d47a1;
            border-color: #2196f3;
        }
    </style>
</head>
<body>
    <div class="container mx-auto px-4 py-6">
        <!-- Header Section -->
        <header class="calendar-card p-6 mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold">Appointment Calendar</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-1">
                        <span id="current-month"></span> • 
                        <span id="appointment-count">0</span> appointments
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <button id="dark-mode-toggle" class="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- Filters Section -->
        <div class="calendar-card p-6 mb-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                </svg>
                Filters
            </h3>
            <div class="flex gap-4 items-end">
                <div class="flex-1">
                    <label class="block text-sm font-medium mb-1">Doctor</label>
                    <select id="doctor-filter" class="w-full px-3 py-2 border rounded-md">
                        <option value="">All Doctors</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium mb-1">Patient</label>
                    <select id="patient-filter" class="w-full px-3 py-2 border rounded-md">
                        <option value="">All Patients</option>
                    </select>
                </div>
                <button id="clear-filters" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                    Clear Filters
                </button>
            </div>
        </div>

        <!-- Calendar Grid -->
        <div class="calendar-card">
            <div class="p-6">
                <div class="grid grid-cols-7 gap-1 mb-4">
                    <div class="text-center font-semibold py-3">Sun</div>
                    <div class="text-center font-semibold py-3">Mon</div>
                    <div class="text-center font-semibold py-3">Tue</div>
                    <div class="text-center font-semibold py-3">Wed</div>
                    <div class="text-center font-semibold py-3">Thu</div>
                    <div class="text-center font-semibold py-3">Fri</div>
                    <div class="text-center font-semibold py-3">Sat</div>
                </div>
                <div id="calendar-grid" class="grid grid-cols-7 gap-1">
                    <!-- Calendar days will be inserted here via JavaScript -->
                </div>
            </div>
        </div>

        <!-- Appointments List -->
        <div class="calendar-card mt-6">
            <div class="p-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">
                        Appointments for <span id="selected-date"></span>
                    </h3>
                    <button id="new-appointment" class="px-4 py-2 bg-blue-600 text-white rounded-md">
                        <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        New
                    </button>
                </div>
                <div id="appointments-list" class="space-y-2">
                    <!-- Appointments will be inserted here via JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add JavaScript for functionality
        document.addEventListener('DOMContentLoaded', function() {
            const darkModeToggle = document.getElementById('dark-mode-toggle');
            
            // Dark mode toggle
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }

            // Initialize calendar
            updateCalendar();
        });

        function updateCalendar() {
            const calendarGrid = document.getElementById('calendar-grid');
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            
            // Update month display
            document.getElementById('current-month').textContent = 
                new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(today);

            // Clear existing calendar
            calendarGrid.innerHTML = '';

            // Add calendar days
            // ... (Additional calendar logic would go here)
        }
    </script>
</body>
</html>
