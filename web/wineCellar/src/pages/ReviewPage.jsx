import React, { useState } from 'react';
import CommentList from '../components/Review/CommentList';
import ReviewHeader from '../components/Review/ReviewHeader';
import ReviewHeaderText from '../components/Review/ReviewHeaderText';
import WriteReviewInput from '../components/Review/WriteReviewInput';
import MyReview from '../components/Review/MyReview';
import useModal from '../components/hooks/UseModal';

import AddWineListReview from '../components/Review/AddWineListReview';

function ReviewPage() {
  const [selectedTab, setSelectedTab] = useState('community');
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <ReviewHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex flex-col gap-3 md:gap-4 items-center max-w-full md:max-w-2xl w-full mx-auto md:p-2">
        {selectedTab === 'community' && (
          <>
            <ReviewHeaderText />
          </>
        )}
        {selectedTab === 'my-reviews' && (
          <>
            <MyReview openModal={openModal} />
            {isModalOpen && <AddWineListReview closeModal={closeModal} />}
          </>
        )}
        <CommentList selectedTab={selectedTab} />
      </div>
    </>
  );
}

export default ReviewPage;
