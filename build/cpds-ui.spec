%define _topdir @RPM_BUILD_DIR@
%define name @RPM_NAME@
%define version @RPM_VERSION@
%define release @RPM_RELEASE@
%define arch @RPM_ARCH@

Name:           %{name}
Version:        %{version}
Release:        %{release}
Summary:        CPDS UI components, providing a web-based graphical interface.
License:        MIT
BuildArch:      %{arch}

Requires: nginx

%description
UI components, providing a web-based graphical interface for user management and use of CPDS systems.
%install
mkdir -p %{buildroot}/etc/cpds/cpds-ui/
mkdir -p %{buildroot}/etc/nginx/conf.d/
cp cpds-ui.conf %{buildroot}/etc/nginx/conf.d
cp -r cpds-ui/* %{buildroot}/etc/cpds/cpds-ui

%post
systemctl start nginx
systemctl enable nginx

%files
/etc/*

%changelog