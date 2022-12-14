import React from 'react';
import { getCollections } from '../../api/CollectionsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Card from '../../components/module/CollectionCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ServerURL } from '../../api/Axios';

export default function Collections() {
	const collections = useSelector((state: RootState) => state.collection);

	React.useEffect(() => {
		getCollections();
	}, []);

	const { pdfs, videos } = collections;

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>PDFs</Text>
				</Box>

				<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
					{pdfs.map((pdf, index) => (
						<Card key={index} title={pdf.title} pdf link={ServerURL + 'file/' + pdf.link} />
					))}
				</Box>

				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Videos</Text>
				</Box>

				<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
					{videos.map((video, index) => (
						<Card key={index} title={video.title} video link={video.link} />
					))}
				</Box>
			</Box>
		</Box>
	);
}
