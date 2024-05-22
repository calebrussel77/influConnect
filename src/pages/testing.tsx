import { Button } from '@/components/ui/button';
import { modals } from '@/components/ui/modal';

const TestPage = () => {
  const openDeleteModal = () => {
    modals.openContextModal({
      modal: 'feedbackForm',
      isFullScreen: true,
      hidePaddingContent: true,
      innerProps: {},
    });
  };

  return (
    <div className="flex h-screen min-h-screen w-full items-center justify-center px-16">
      <Button onClick={openDeleteModal}>Switcher sur le profile James</Button>
    </div>
  );
};

TestPage.getLayout = (page: React.ReactNode) => {
  return page;
};

export default TestPage;
