const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ... props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:border-primary-300 disabled:text-primary-300',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      {...props}
    >
      {Icon && <Icon className={`w-5 h-5 ${children ?  'mr-2' : ''}`} />}
      {children}
    </button>
  )
}

export default Button