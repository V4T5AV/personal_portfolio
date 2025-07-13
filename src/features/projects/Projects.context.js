import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react'

// Initial state
const initialState = {
  projects: [],
  selectedProject: null,
  filter: 'all',
  sortBy: 'date',
  isLoading: false,
  error: null
}

// Action types
const ACTIONS = {
  SET_PROJECTS: 'SET_PROJECTS',
  SELECT_PROJECT: 'SELECT_PROJECT',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_SELECTION: 'CLEAR_SELECTION'
}

// Reducer
const projectsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        isLoading: false,
        error: null
      }
    
    case ACTIONS.SELECT_PROJECT:
      return {
        ...state,
        selectedProject: action.payload
      }
    
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    
    case ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload
      }
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    
    case ACTIONS.CLEAR_SELECTION:
      return {
        ...state,
        selectedProject: null
      }
    
    default:
      return state
  }
}

// Create context
const ProjectsContext = createContext()

// Provider component
export const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialState)

  // Actions - memoized with useCallback
  const setProjects = useCallback((projects) => {
    dispatch({ type: ACTIONS.SET_PROJECTS, payload: projects })
  }, [])

  const selectProject = useCallback((project) => {
    dispatch({ type: ACTIONS.SELECT_PROJECT, payload: project })
  }, [])

  const setFilter = useCallback((filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter })
  }, [])

  const setSort = useCallback((sortBy) => {
    dispatch({ type: ACTIONS.SET_SORT, payload: sortBy })
  }, [])

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading })
  }, [])

  const setError = useCallback((error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
  }, [])

  const clearSelection = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_SELECTION })
  }, [])

  // Computed values - memoized with useMemo
  const filteredProjects = useMemo(() => {
    let filtered = state.projects

    // Apply filter
    if (state.filter !== 'all') {
      filtered = filtered.filter(project => 
        project.technologies.includes(state.filter)
      )
    }

    // Apply sort
    switch (state.sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category))
        break
      default:
        break
    }

    return filtered
  }, [state.projects, state.filter, state.sortBy])

  const getProjectById = useCallback((id) => {
    return state.projects.find(project => project.id === id)
  }, [state.projects])

  const value = useMemo(() => ({
    ...state,
    filteredProjects,
    setProjects,
    selectProject,
    setFilter,
    setSort,
    setLoading,
    setError,
    clearSelection,
    getProjectById
  }), [state, filteredProjects, setProjects, selectProject, setFilter, setSort, setLoading, setError, clearSelection, getProjectById])

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}

// Hook to use the context
export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}

export default ProjectsContext 