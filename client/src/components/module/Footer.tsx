import React from 'react';
import { BRAIN } from '../../assets/Images';
import Box from '../root/Box';
import Button from '../root/Button';
import Image from '../root/Image';
import Text from '../root/Text';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
	const navigate = useNavigate();

	const to = (path: string) => {
		navigate('/home/' + path);
	};

	return (
		<footer className='bg-dark text-white  px-[5%] py-[5%]'>
			<Box horizontal className='flex-col md:flex-row justify-between'>
				<Box horizontal>
					<Box className='w-[200px] rounded-full overflow-hidden'>
						<Image src={BRAIN} />
					</Box>
					<Box className='ml-6'>
						<Text className='text-2xl'>EduCareTech</Text>
						<ul className='text-light decoration-white list-disc ml-9'>
							<li>
								<Button onClick={() => to('programs')} className='!bg-transparent text-dark px-0'>
									<Text className='text-light'>Programs</Text>
								</Button>
							</li>
							<li>
								<Button onClick={() => to('skills')} className='!bg-transparent text-dark px-0'>
									<Text className='text-light'>Skill Set</Text>
								</Button>
							</li>
							<li>
								<Button
									onClick={() => to('collections')}
									className='!bg-transparent text-dark px-0'
								>
									<Text className='text-light'>Collections</Text>
								</Button>
							</li>
							<li>
								<Button onClick={() => to('tests')} className='!bg-transparent text-dark px-0'>
									<Text className='text-light'>MCQs</Text>
								</Button>
							</li>
						</ul>
					</Box>
				</Box>
				<Box className='items-end justify-end'>
					<Text className='text-2xl mb-3'>Contact Us</Text>
					<a href='mailto:someone@example.com' className='transform-none'>
						<Text>jyotieducaretech@gmail.com</Text>
					</a>
				</Box>
			</Box>
		</footer>
	);
}
