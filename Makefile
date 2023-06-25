RPM_NAME=cpds-ui
RPM_VERSION=1.0
RPM_RELEASE=1.0.0
RPM_ARCH=aarch64
RPM_BUILD_DIR=$(shell pwd)/rpmbuild
RPM_SPEC_FILE=$(RPM_BUILD_DIR)/SPECS/$(RPM_NAME).spec
RPM_DIRS = BUILD BUILDROOT RPMS SOURCES SPECS SRPMS

.PHONY: clean build

clean:
	rm -rf rpmbuild
	rm -rf target

build: clean
	npm install --force && npm run build
	mkdir -p $(foreach dir,$(RPM_DIRS),$(RPM_BUILD_DIR)/$(dir))
	mkdir -p $(RPM_BUILD_DIR)/BUILD/cpds-ui/
	cp -r cpds-ui/* $(RPM_BUILD_DIR)/BUILD/cpds-ui/
	cp build/* $(RPM_BUILD_DIR)/BUILD/

	sed -e "s/@RPM_NAME@/$(RPM_NAME)/g" \
	        -e "s/@RPM_VERSION@/$(RPM_VERSION)/g" \
	        -e "s/@RPM_RELEASE@/$(RPM_RELEASE)/g" \
	        -e "s/@RPM_ARCH@/$(RPM_ARCH)/g" \
        	-e "s|@RPM_BUILD_DIR@|$(RPM_BUILD_DIR)|g" \
	        build/cpds-ui.spec > $(RPM_SPEC_FILE)


	rpmbuild -bb rpmbuild/SPECS/cpds-ui.spec

	mkdir target

	find ${RPM_BUILD_DIR}/RPMS -type f -name "*.rpm" -exec cp {} ./target \;

	rm -rf rpmbuild


