/* eslint-disable no-eval */

describe("Maps Tests", () => {
   it("should set map to null when removing markers", () => {
      // Arrange - Prepare our test
      const request = new DirectionsHandler();
      spyOn(request.directionsRenderer, "setMap");
      // Act - Perform the test
      request.clearMap();
      // Assert - Check out result is what we expected
      expect(request.directionsRenderer.setMap).toHaveBeenCalledWith(null);
   });

   it("My Second Test", () => {
      expect(true).toBe(true);
   });
});
