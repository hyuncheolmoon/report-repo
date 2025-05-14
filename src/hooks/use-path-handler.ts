const usePathHandler = () => {
  return {
    path: {
      survey: '/survey',
      surveyDetail: '/survey/:surveyId',
      surveyEdit: '/survey/:surveyId/edit',
    },
  };
};

export default usePathHandler;
