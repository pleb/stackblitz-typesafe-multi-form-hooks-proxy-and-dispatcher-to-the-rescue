/*
 Usage:
 <YourElement className={cn(styles.class1, condition && styles.class2)} />
 */
export const cn = (...classNames: (false | string | string[] | undefined)[]) =>
  classNames
    .filter(c => Boolean(c))
    .flat()
    .join(' ') || undefined
