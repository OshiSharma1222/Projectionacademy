function cx(...args) {
  return args
    .flat()
    .filter((x) => x !== null && x !== undefined)
    .join(' ')
}

function cva(base, config = {}) {
  const { variants = {}, defaultVariants = {} } = config

  return (props = {}) => {
    const { className, ...rest } = props
    const variantKeys = Object.keys(variants)
    const classNames = [base, className]

    variantKeys.forEach((key) => {
      const variantValue = props[key] ?? defaultVariants[key]
      if (variantValue) {
        const variant = variants[key]?.[variantValue]
        if (variant) classNames.push(variant)
      }
    })

    return cx(classNames)
  }
}

export { cva, cx }
