import { SVGProps, HTMLAttributes } from 'react'

const SvgIconEdit = (
  props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGAElement>,
) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.04022 15.8851L18.3202 5.60511C19.1012 4.82411 19.1012 3.55811 18.3202 2.77711L17.1982 1.65411C16.4172 0.873109 15.1512 0.873109 14.3702 1.65411L4.08922 11.9351C3.94322 12.0811 3.82122 12.2491 3.72622 12.4321L1.09622 17.5281C0.650224 18.3931 1.57722 19.3211 2.44222 18.8761L7.54122 16.2501C7.72622 16.1541 7.89422 16.0321 8.04022 15.8851Z'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.91016 12.1899L7.79016 16.0699'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15.9991 19H2.03906'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default SvgIconEdit
