DIR1="../Aplikacja Electron/build"
if [ -d "$DIR1" ]; then
    rm -r ../'Aplikacja Electron'/build
fi
cp -r build ../'Aplikacja Electron' 

DIR2="../React Server/build"
if [ -d "$DIR2" ]; then
    rm -r ../'React Server'/build
fi
mv build ../'React Server'

