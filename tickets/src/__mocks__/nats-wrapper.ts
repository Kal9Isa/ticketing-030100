export const natsWrapper = {
  client: {
    publish: jest
      // To keep track of params in and out of functions
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
