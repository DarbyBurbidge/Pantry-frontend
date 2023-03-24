
export const Footer: React.FC = () => {
    const year = new Date().getFullYear()

    return(<div className="footer">
        &copy;{year} Darby Burbidge
    </div>);
};