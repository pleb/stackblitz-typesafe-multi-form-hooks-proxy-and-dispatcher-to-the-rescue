import { SVGProps, HTMLAttributes } from 'react'

const SvgIconTrash = (
  props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGAElement>,
) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 18 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M15 4V16.75C15 17.993 13.973 19 12.731 19H5.231C3.988 19 3 17.993 3 16.75V4'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M16.5 4H1.5'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7 1H11'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M11 8V15'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7 15V8'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default SvgIconTrash
