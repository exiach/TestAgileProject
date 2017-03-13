(function () {
    'use strict';

    var sessionService,
        $cookiesMock,
        cookieMock,
        auth,
        expiredDate;

    describe('Session Service', function () {
        
        cookieMock = function() {
            this.get = function () {};
            this.put = function () {};
            this.remove = function () {};
        };

        expiredDate = new Date();

        auth = {
            accessToken: 'Hahy3j2SfgDS3A23N3Ughfds4',
            refreshToken: 'fgDS3j23Aghfd23NHahyS3Us4',
            expiredDate: expiredDate
        };

        beforeEach(function () {
            module('app.session');
        });

        beforeEach(module(function ($provide) {
            $provide.service('$cookies', cookieMock);
        }));

        beforeEach(inject(function (_$injector_) {
            sessionService = _$injector_.get('SessionService');
            $cookiesMock = _$injector_.get('$cookies');
        }));

        it('should be defined', function () {
            expect(sessionService).toBeDefined();
        });

        it('should be undefined when the user is not saved in the cookies', function () {
            spyOn($cookiesMock, 'get').and.returnValue(undefined);
            var authSession = sessionService.getAuthSession();
            expect(authSession).toBeUndefined();
            expect($cookiesMock.get).toHaveBeenCalled();
        });

        it('should save in the cookies a authSession', function () {
            spyOn($cookiesMock, 'put');
            spyOn($cookiesMock, 'get').and.returnValue({});
            sessionService.setAuthSession(auth);
            var authSession = sessionService.getAuthSession();
            expect(authSession).toBeDefined();
            expect($cookiesMock.put).toHaveBeenCalled();
        });

        it('should get authSession like object', function () {
            spyOn($cookiesMock, 'put');
            spyOn($cookiesMock, 'get').and.returnValue(auth);
            sessionService.setAuthSession(auth);
            var authSession = sessionService.getAuthSession();
            expect(authSession).toBeDefined();
            expect(authSession.accessToken).toBe('Hahy3j2SfgDS3A23N3Ughfds4');
            expect(authSession.refreshToken).toBe('fgDS3j23Aghfd23NHahyS3Us4');
            expect(authSession.expiredDate).toBe(expiredDate);
        });

        it('should remove authSession', function () {
            spyOn($cookiesMock, 'put');
            spyOn($cookiesMock, 'get').and.returnValue(undefined);
            spyOn($cookiesMock, 'remove');
            sessionService.setAuthSession(auth);
            sessionService.removeAuthSession();
            var authSession = sessionService.getAuthSession();
            expect(authSession).toBeUndefined();
            expect($cookiesMock.remove).toHaveBeenCalled();
        });

        it('should return true if the date is expired', function () {
            spyOn($cookiesMock, 'get').and.returnValue(auth);
            sessionService.setAuthSession(auth);
            var isExpiredDate = sessionService.isExpiredDate();
            expect(isExpiredDate).toBe(true);
        });

        it('should return false if the date is expired', function () {
            var isExpiredDate = sessionService.isExpiredDate();
            expect(isExpiredDate).toBe(false);
        });
    });

})();