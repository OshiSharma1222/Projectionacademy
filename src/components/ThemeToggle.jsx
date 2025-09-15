import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="fixed top-24 right-6 z-50 group">
              <button
          onClick={toggleTheme}
          className="p-4 rounded-full bg-gray dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-gray-700 hover:scale-110 ring-2 ring-blue-200 dark:ring-gray-600 hover:ring-blue-400 dark:hover:ring-gray-500"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-blue-600" />
          )}
        </button>
      <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {isDark ? 'Switch to Light' : 'Switch to Dark'}
      </div>
    </div>
  )
}

export default ThemeToggle